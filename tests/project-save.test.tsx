import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BlobPreconditionFailedError,BlobServiceRateLimited} from '@vercel/blob';
import {sameProjectVersion,projectSaveFailure} from '../lib/project-save';
test('open tabs with a compressed weak tag still match the same strong storage version',()=>{assert.equal(sameProjectVersion('W/"same-version"','"same-version"'),true);assert.equal(sameProjectVersion('"same-version"','"same-version"'),true);assert.equal(sameProjectVersion('W/"old-version"','"new-version"'),false);assert.equal(sameProjectVersion(undefined,'"existing-version"'),false);assert.equal(sameProjectVersion(undefined,undefined),true);assert.equal(sameProjectVersion({etag:'bad'},'"version"'),false)});
test('storage conflicts, rate limits and outages are not all reported as a reload conflict',()=>{assert.equal(projectSaveFailure(new BlobPreconditionFailedError()).status,409);assert.equal(projectSaveFailure(new BlobServiceRateLimited()).status,429);assert.equal(projectSaveFailure(new Error('provider failure')).status,503)});
