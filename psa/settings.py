import time
import os
DEBUG = True 					# Показывать или нет сообщения уровня DEBUG
USE_COLORS = True 				# Следует ли использовать цвета при выводе текста
ADDONS_INFO_FILENAME = 'link_for_crawler.txt'

LOGGING = {						# dictConfig для выходного потока и ведения журнала файлов
	'version': 1,              
    'disable_existing_loggers': False,

	'formatters': {
		'console': {
			'format': '[%(asctime)s] %(levelname)s::%(module)s - %(message)s',
		},
		'file': {
			'format': '[%(asctime)s] %(levelname)s::(P:%(process)d T:%(thread)d)::%(module)s - %(message)s',
		},
	},

	'handlers': {
     	'file': {
			'class': 'logging.handlers.RotatingFileHandler',
			'formatter':'file',
			'level': 'DEBUG',
			'filename': 'pycrawler.log',
		},
		'console': {
			'class': 'ColorStreamHandler.ColorStreamHandler',
			'formatter':'console',
			'level': 'INFO',
			'use_colors': USE_COLORS,
		},

	},

	'loggers': {
		'log': {
			'handlers': ['console', 'file'],
			'level': 'DEBUG' if DEBUG else 'INFO',
			'propagate': True,
		},
	}
}   