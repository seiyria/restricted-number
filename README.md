# restricted-number

A nice little tool to keep your numbers in a certain range. This was primarily designed for game developers with data like HP, MP, etc that should be kept within a range.

Why use this? It saves you from typing this over and over:

```js
if(hp <= 0) { hp=0; die(); }

if(hp > maxHp) hp = maxHp
```

Here's an example usage for a player:
```js
var hp = new RestrictedNumber(0, 100, 100);

if(hp.sub(20).atMin()) die();

```

Or maybe for AI:
```js
var hp = new RestrictedNumber(0, 100, 100);

if(hp.ltePercent(66)) flee();
```

## Installation

Install with npm:

```
npm install --save restricted-number
```

## Testing

From the repo root:

```
npm install
npm test
```

## Functions
Function | Description
-------- | -----------
 new RestrictedNumber(min, max, current) | construct a RestrictedNumber
 set(num) | set the datum to `num` - mostly used internally
 add(num) | add `num` to the datum
 sub(num) | subtract `num` from the datum
 addOverMaximum(num) | add `num` to both the datum and the range
 subUnderMinimum(num) | subtract `num` from both the datum and the range
 toMaximum() | set the datum to the max value
 toMinimum() | set the datum to the min value
 atMaximum() | returns `true` if the datum is at the maximum
 atMinimum() | returns `true` if the datum is at the minimum
 gt(num) | returns `true` if the datum is greater than `num`
 gte(num) | returns `true` if the datum is greater than or equal to `num`
 lt(num) | returns `true` if the datum is less than `num`
 lte(num) | returns `true` if the datum is less than `num`
 setToPercent(perc) | set the datum to be at `perc` (the range between min and max)
 addPercent(perc) | add `perc` of the datum's `maximum` value to the datum
 subPercent(perc) | subtract `perc` of the datum's `maximum` value from the datum
 asPercent() | get the value of the datum as a percentage
 gtPercent(perc) | returns `true` if datum as a percentage of `maximum` is greater than `perc`
 gtePercent(perc) | returns `true` if datum as a percentage of `maximum` is greater than or equal to`perc`
 ltPercent(perc) | returns `true` if datum as a percentage of `maximum` is less than `perc`
 ltePercent(perc) | returns `true` if datum as a percentage of `maximum` is less than or equal to `perc`
 
 ### Other languages
 Language | Link
 -------- | -----------
 C++ | https://github.com/Oipo/restricted-number-cpp
 BYOND | https://github.com/BYOND/restricted-number
