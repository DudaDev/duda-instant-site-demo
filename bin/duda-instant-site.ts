#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DudaInstantSiteStack } from '../lib/duda-instant-site-stack';

const app = new cdk.App();
new DudaInstantSiteStack(app, 'DudaInstantSiteStack');
