
class RestrictedNumber
	@maximum 	= 0
	@minimum 	= 0
	@__current = 0
	@booster 	= 0

	constructor: (@minimum, @maximum, @__current = @maximum, @booster = 0) ->
		[@maximum, @minimum] = [@minimum, @maximum] if @minimum > @maximum
		@set @__current

	## Setter value functions

	set: (num) ->
		num = Math.min num, @maximum
		num = Math.max num, @minimum
		@__current = num
		@

	add: (num) ->
		@set @__current+num

	sub: (num) ->
		@add -num

	addAndBound: (num) ->
		@maximum += num
		@add num

	subAndBound: (num) ->
		@minimum -= num
		@sub num

	toMaximum: () ->
		@add @maximum

	toMinimum: () ->
		@sub @maximum

	## Value checking functions (non-chainable)

	getTotal: () -> @__current + @booster

	getValue: () -> @getTotal()

	atMax: () -> @maximum <= @getTotal()

	atMin: () -> @minimum >= @getTotal()

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
