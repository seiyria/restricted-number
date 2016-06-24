
class RestrictedNumber
	@maximum 	= 0
	@minimum 	= 0
	@__current = 0

	constructor: (@minimum, @maximum, @__current = @maximum) ->
		[@maximum, @minimum] = [@minimum, @maximum] if @minimum > @maximum
		@set @__current

	## Setter value functions

	set: (num) ->
		num = Math.min num, @maximum
		num = Math.max num, @minimum
		@__current = num
		@

	add: (num) ->
		if @__current+num > @maxmimum then @_remainder = @maximum - @__current+num
		@set @__current+num

	sub: (num) ->
		if @__current-num < @minimum then @_remainder = @minimum - (@__current-num)
		@set @__current-num

	addOverMaximum: (num) ->
		@maximum += num
		@add num

	subUnderMinimum: (num) ->
		@minimum -= num
		@sub num

	toMaximum: () ->
		@set @maximum

	toMinimum: () ->
		@set @minimum

	## Value checking functions (non-chainable)

	getTotal: () -> @__current

	getValue: () -> @getTotal()

	atMaximum: () -> @maximum <= @getTotal()

	atMinimum: () -> @minimum >= @getTotal()

	equals: (num) -> @getTotal() is num

	greaterThan: (num) -> @getTotal() > num

	gte: (num) -> @getTotal() >= num

	lessThan: (num) -> not @gte num

	lte: (num) -> not @greaterThan num

	## Setter percentage functions

	setToPercent: (perc) ->
		@set perc * (@maximum - @minimum) / 100

	addPercent: (perc) ->
		@add perc * (@maximum - @minimum) / 100

	subPercent: (perc) ->
		@addPercent -perc

	## Percentage functions

	asPercent: () -> Math.floor @getTotal() / @maximum * 100

	## Percentage checking functions (non-chainable)

	greaterThanPercent: (perc) -> @asPercent() > perc

	gtePercent: (perc) -> @asPercent() >= perc

	lessThanPercent: (perc) -> not @gtePercent perc

	ltePercent: (perc) -> not @greaterThanPercent perc

	equalsPercent: (perc) -> @asPercent() is perc

module.exports = RestrictedNumber
