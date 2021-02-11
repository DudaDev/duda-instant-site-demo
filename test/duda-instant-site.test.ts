import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as DudaInstantSite from '../lib/duda-instant-site-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new DudaInstantSite.DudaInstantSiteStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
