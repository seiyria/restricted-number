
import test from 'ava-ts';

import { RestrictedNumber } from './RestrictedNumber';

test('Constructor should properly assign all values', t => {

    const RN = new RestrictedNumber(0, 100, 55);
    t.is(RN.minimum, 0);
    t.is(RN.maximum, 100);
    t.is(RN.total, 55);

});

test('Constructor should infer current value with only min and max', t => {

    const RN = new RestrictedNumber(0, 100);
    t.is(RN.minimum, 0);
    t.is(RN.maximum, 100);
    t.is(RN.total, 100);

});

test('Constructor should throw when min > max', t => {

    t.throws(() => new RestrictedNumber(100, 0));

});

test('Constructor should cap value in constructor', t => {

    const RNA = new RestrictedNumber(0, 100, 101);
    t.is(RNA.total, 100);

    const RNB = new RestrictedNumber(0, 100, -1);
    t.is(RNB.total, 0);

});

test('Bounds checking should work', t => {

    const RNA = new RestrictedNumber(0, 100, 101);
    t.true(RNA.atMaximum());

    const RNB = new RestrictedNumber(0, 100, -1);
    t.true(RNB.atMinimum());

});

test('Simple value comparisons should all make sense', t => {

    const RN = new RestrictedNumber(0, 100, 60);
    t.is(RN.total, 60);

    t.true(RN.gt(59), 'gt 59');
    t.false(RN.gt(60), 'gt 60');
    t.false(RN.gt(61), 'gt 61');

    t.false(RN.lt(59), 'lt 59');
    t.false(RN.lt(60), 'lt 60');
    t.true(RN.lt(61), 'lt 61');

    t.true(RN.gte(59), 'gte 59');
    t.true(RN.gte(60), 'gte 60');
    t.false(RN.gte(61), 'gte 61');

    t.false(RN.lte(59), 'lte 59');
    t.true(RN.lte(60), 'lte 60');
    t.true(RN.lte(61), 'lte 61');

});

test('Percentage value comparisons should all make sense', t => {

    const RN = new RestrictedNumber(0, 100, 60);

    t.true(RN.gtPercent(59), 'gtp 59');
    t.false(RN.gtPercent(60), 'gtp 60');
    t.false(RN.gtPercent(61), 'gtp 61');

    t.false(RN.ltPercent(59), 'ltp 59');
    t.false(RN.ltPercent(60), 'ltp 60');
    t.true(RN.ltPercent(61), 'ltp 61');

    t.true(RN.gtePercent(59), 'gtep 59');
    t.true(RN.gtePercent(60), 'gtep 60');
    t.false(RN.gtePercent(61), 'gtep 61');

    t.false(RN.ltePercent(59), 'ltep 59');
    t.true(RN.ltePercent(60), 'ltep 60');
    t.true(RN.ltePercent(61), 'ltep 61');

    t.is(RN.asPercent(), 60);

});

test('Simple value mutators should all work correctly', t => {

    const createRN = () => new RestrictedNumber(0, 100, 50);
    
    const RN1 = createRN();
    t.is(RN1.add(10).total, 60);
    t.is(RN1.add(50).total, 100);

    const RN2 = createRN();
    t.is(RN2.sub(10).total, 40);
    t.is(RN2.sub(50).total, 0);

    const RN3 = createRN();
    t.is(RN3.toMinimum().total, 0);

    const RN4 = createRN();
    t.is(RN4.toMaximum().total, 100);

    const RN5 = createRN();
    RN5.total = 10;
    t.is(RN5.total, 10);

});

test('Percentage value mutators should all work correctly', t => {

    const createRN = () => new RestrictedNumber(0, 100, 50);
    
    const RN1 = createRN();
    t.is(RN1.addPercent(10).total, 60);
    t.is(RN1.addPercent(50).total, 100);

    const RN2 = createRN();
    t.is(RN2.subPercent(10).total, 40);
    t.is(RN2.subPercent(50).total, 0);

    const RN5 = createRN();
    t.is(RN5.setToPercent(10).total, 10);

});

test('Complex value mutators should all work correctly', t => {

    const createRN = () => new RestrictedNumber(0, 100, 50);
    
    const RN1 = createRN();
    t.is(RN1.addOverMaximum(10).total, 60);
    t.is(RN1.maximum, 110);

    const RN2 = createRN();
    t.is(RN2.subUnderMinimum(10).total, 40);
    t.is(RN2.minimum, -10);

});