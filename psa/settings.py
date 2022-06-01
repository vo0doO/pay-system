import time
DEBUG = True 					# Whether or not to show DEBUG level messages
USE_COLORS = True 				# Whether or not colors should be used when outputting text
EMAILS_FILENAME = 'data/emails.csv'
DOMAINS_FILENAME = 'data/domains.csv'
ADDONS_INFO_FILENAME = 'link_for_crawler.txt'
import ColorStreamHandler
import logging
LOGGING = {						# dictConfig for output stream and file logging
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
		'console': {
			'class': 'ColorStreamHandler.ColorStreamHandler',
			'formatter':'console',
			'level': 'DEBUG',
			'use_colors': USE_COLORS,
		},
		'file': {
			'class': 'logging.handlers.RotatingFileHandler',
			'formatter':'file',
			'level': 'INFO',
			'filename': './pycrawler.log',
		},
	},

	'loggers': {
		'crawler_logger': {
			'handlers': ['console', 'file'],
			'level': 'DEBUG' if DEBUG else 'INFO',
			'propagate': True,
		},
	}
}   