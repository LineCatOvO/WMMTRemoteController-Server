// 终端状态面板模块
// 使用ANSI转义序列实现动态终端监控

/**
 * 终端控制工具类，封装ANSI转义序列
 */
class TerminalControl {
    /**
     * 隐藏光标
     */
    static hideCursor(): void {
        process.stdout.write('\x1b[?25l');
    }

    /**
     * 显示光标
     */
    static showCursor(): void {
        process.stdout.write('\x1b[?25h');
    }

    /**
     * 清屏
     */
    static clearScreen(): void {
        process.stdout.write('\x1b[2J');
    }

    /**
     * 将光标移动到屏幕左上角
     */
    static moveCursorToTop(): void {
        process.stdout.write('\x1b[H');
    }

    /**
     * 清当前行
     */
    static clearLine(): void {
        process.stdout.write('\x1b[2K');
    }

    /**
     * 清除屏幕并将光标移动到左上角（不推荐使用，会导致闪烁）
     */
    static resetScreen(): void {
        process.stdout.write('\x1b[2J\x1b[H');
    }

    /**
     * 将光标移动到屏幕左上角
     */
    static moveToTop(): void {
        process.stdout.write('\x1b[H');
    }

    /**
     * 逐行写入内容，不清屏，只覆盖
     * @param lines 要写入的行数组
     */
    static writeLines(lines: string[]): void {
        // 光标移动到顶部
        process.stdout.write('\x1b[H');
        
        // 逐行写入
        lines.forEach(line => {
            // 清除当前行，然后写入新内容
            process.stdout.write('\x1b[2K');
            process.stdout.write(line + '\n');
        });
    }

    /**
     * 差分写入内容，只更新变化的行
     * @param lines 要写入的行数组
     * @param lastLines 上一帧的行数组
     * @returns 更新后的行数组
     */
    static diffWriteLines(lines: string[], lastLines: string[]): string[] {
        // 确保行数一致，补全或截断
        const maxLines = Math.max(lines.length, lastLines.length);
        const resultLines = [...lines];
        
        // 补全行数
        while (resultLines.length < maxLines) {
            resultLines.push('');
        }
        
        // 光标移动到顶部
        process.stdout.write('\x1b[H');
        
        // 只更新变化的行
        for (let i = 0; i < maxLines; i++) {
            const currentLine = i < lines.length ? lines[i] : '';
            const lastLine = i < lastLines.length ? lastLines[i] : '';
            
            // 只更新变化的行
            if (currentLine !== lastLine) {
                // 移动到指定行首
                process.stdout.write(`\x1b[${i + 1};1H`);
                // 清除当前行
                process.stdout.write('\x1b[2K');
                // 写入新内容
                process.stdout.write(currentLine);
            }
        }
        
        return resultLines;
    }
}

/**
 * 终端状态面板类
 */
export class TerminalMonitor {
    private state: any;
    private fps: number;
    private intervalId: NodeJS.Timeout | null = null;
    private startTime: number;
    private frameCount: number;
    private lastRenderTime: number;
    private clientConnected: boolean;
    private lastLines: string[]; // 上一帧的行内容，用于差分渲染

    /**
     * 构造函数
     * @param state 要监控的状态对象
     * @param fps 渲染频率，默认为20 FPS（优化后，减少闪烁）
     */
    constructor(state: any, fps: number = 20) {
        this.state = state;
        this.fps = fps;
        this.startTime = Date.now();
        this.frameCount = 0;
        this.lastRenderTime = 0;
        this.clientConnected = false;
        this.lastLines = []; // 初始化上一帧行数组
    }

    /**
     * 开始监控
     */
    start(): void {
        // 隐藏光标
        TerminalControl.hideCursor();

        // 设置渲染间隔
        this.intervalId = setInterval(() => {
            this.render();
        }, 1000 / this.fps);

        // 设置进程退出清理
        process.on('exit', () => {
            this.stop();
        });

        // 设置Ctrl+C退出清理
        process.on('SIGINT', () => {
            this.stop();
            process.exit(0);
        });

        console.log('Terminal monitor started with', this.fps, 'FPS');
    }

    /**
     * 停止监控
     */
    stop(): void {
        // 清除渲染间隔
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        // 恢复光标显示
        TerminalControl.showCursor();

        // 清屏
        TerminalControl.resetScreen();

        console.log('Terminal monitor stopped');
    }

    /**
     * 设置客户端连接状态
     * @param connected 连接状态
     */
    setClientConnected(connected: boolean): void {
        this.clientConnected = connected;
    }

    /**
     * 渲染状态面板
     */
    private render(): void {
        const currentTime = Date.now();
        this.frameCount++;

        // 计算FPS
        let displayFps = this.fps;
        if (currentTime - this.startTime >= 1000) {
            displayFps = Math.round((this.frameCount * 1000) / (currentTime - this.startTime));
            this.frameCount = 0;
            this.startTime = currentTime;
        }

        // 计算渲染耗时
        const renderTime = currentTime - this.lastRenderTime;
        this.lastRenderTime = currentTime;

        // 生成所有要显示的行
        const lines: string[] = [];
        
        // 添加头部
        lines.push('┌─────────────────────────────────────────────────┐');
        lines.push('│ WMMT Controller Server Input Monitor           │');
        lines.push('├─────────────────────────────────────────────────┤');
        lines.push(`│ Client:   ${this.clientConnected ? 'connected' : 'disconnected'}                        │`);
        lines.push(`│ FPS:      ${displayFps.toString().padEnd(2)} (${renderTime}ms)                               │`);
        lines.push('└─────────────────────────────────────────────────┘');
        
        // 提取状态信息
        const { keyboard, gamepad, mouse, joystick } = this.state;

        // 格式化状态信息
        const keyboardKeys = Array.from(keyboard || []).join(' ');
        const gamepadButtons = Array.from(gamepad || []).join(' ');
        const mouseInfo = `x=${mouse.x.toString().padStart(4)} y=${mouse.y.toString().padStart(4)} left=${mouse.left} right=${mouse.right}`;
        const joystickInfo = `x=${joystick.x.toFixed(2).padStart(5)} y=${joystick.y.toFixed(2).padStart(5)} deadzone=${joystick.deadzone}`;

        // 添加输入状态
        lines.push('┌─────────────────────────────────────────────────┐');
        lines.push(`│ Keyboard: ${keyboardKeys.padEnd(43)} │`);
        lines.push(`│ Gamepad:  ${gamepadButtons.padEnd(43)} │`);
        lines.push(`│ Mouse:    ${mouseInfo.padEnd(36)} │`);
        lines.push(`│ Joystick: ${joystickInfo.padEnd(36)} │`);
        lines.push('└─────────────────────────────────────────────────┘');

        // 使用差分写入更新屏幕，只更新变化的行
        this.lastLines = TerminalControl.diffWriteLines(lines, this.lastLines);
    }
}
