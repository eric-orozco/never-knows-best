import '../polyfills';

import {platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import { AppModuleNgFactory } from './app.module.ngfactory'; // file generated while running

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);