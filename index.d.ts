import { Logger } from "./src"
import { ColorHexComplex } from "./src/utils/color-utils"
import { Optional } from "./src/utils/typing"

type LoggerLogFunction = (message: unknown, more?: { details?: string | object, tags?: string | string[], depth?: number }) => void

type LoggerMethods<T extends string> = Record<T, LoggerLogFunction>

const Resource: new <T extends string>(attr: LoggerConfig<T>) => Logger & LoggerMethods<T> = Logger as any

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

type LoggerLevel = {
	badge?: string,
    color?: LoggerColor | ColorHexComplex,
	label?: string
    logLevel: LogLevel
}

export type LoggerLevelsConfig<T extends string = string> = Record<T, LoggerLevel>

export interface LoggerPrintMessageFormatterData {
	message: string
	level: string
	label: string
	badge: string
	timestamp: string
	color?: ColorHexComplex | LoggerColor
	more?: { details?: string, tags?: string | string[], depth?: number }
	commonLabel: string
}

export type LoggerPrintMessageFormatter = (data: LoggerPrintMessageFormatterData) => string

export interface LoggerFormatOptions { 
	colorize: { badge?: boolean, label?: boolean }, 
	function: LoggerPrintMessageFormatter 
}

export interface LoggerConfig<T extends string> {
	debug?: boolean,
	levels: LoggerLevelsConfig<T>
	format?: Optional<LoggerFormatOptions, 'function' | 'colorize'>
}

declare namespace IsLunyLogger {
    export const createLogger = <T extends string>(config: LoggerConfig<T>) => Resource<T>
}