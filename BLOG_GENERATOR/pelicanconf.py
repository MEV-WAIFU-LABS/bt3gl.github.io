#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Mia Stein'
SITENAME = u'chmod +x singularity.sh'
SITEURL = 'http://singularity-sh.vercel.app'
PATH = 'content'
TIMEZONE = 'America/New_York'
DEFAULT_LANG = u'en'
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
SOCIAL = (('GitHub', 'https://github.com/go-outside-labs'),)

DEFAULT_PAGINATION = 10
RELATIVE_URLS = True
REVERSE_CATEGORY_ORDER = True
LOCALE = "C"
FEED_ALL_RSS = 'feeds/all.rss.xml'
CATEGORY_FEED_RSS = 'feeds/%s.rss.xml'
THEME = "./website_theme"
FEED_MAX_ITEMS = 5
CATEGORY_FEED = 'feeds/%s.atom.xml'
FEED = 'feeds/all.atom.xml'
TAG_FEED = 'feeds/%s.atom.xml'
