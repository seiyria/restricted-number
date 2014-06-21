chai = require 'chai'
expect = chai.expect
chai.should()

RestrictedNumber = require './RestrictedNumber'

describe 'RestrictedNumber', ->
	describe 'Constructors', ->
		it 'Should correctly assign all values when specified', ->
			RN = new RestrictedNumber 0, 100, 55, 5

			RN.minimum.should.equal 0
			RN.maximum.should.equal 100
			RN.__current.should.equal 55
			RN.booster.should.equal 5

		it 'Should infer a current value with only min and max', ->
			RN = new RestrictedNumber 0, 100

			RN.__current.should.equal 100

		it 'Should correctly initialize even when out of bounds', ->
			Above = new RestrictedNumber 0, 100, 101
			Below = new RestrictedNumber 0, 100, -1

			Above.__current.should.equal 100
			Below.__current.should.equal 0

		it 'Should flip when min and max are given out of order', ->
			RN = new RestrictedNumber 100, 0

			RN.maximum.should.equal 100
			RN.minimum.should.equal 0

	describe 'Accessor Functionality', ->
		describe 'Simple Value Comparison', ->
			RN = new RestrictedNumber 0, 100, 55, 5

			it 'Should correctly calculate total = current + booster', ->
				RN.getTotal().should.equal 60

			it 'Should report > correctly', ->
				RN.greaterThan(59).should.equal true
				RN.greaterThan(60).should.equal false
				RN.greaterThan(61).should.equal false

			it 'Should report < correctly', ->
				RN.lessThan(59).should.equal false
				RN.lessThan(60).should.equal false
				RN.lessThan(61).should.equal true

			it 'Should report >= correctly', ->
				RN.gte(59).should.equal true
				RN.gte(60).should.equal true
				RN.gte(61).should.equal false

			it 'Should report <= correctly', ->
				RN.lte(59).should.equal false
				RN.lte(60).should.equal true
				RN.lte(61).should.equal true

			it 'Should report = correctly', ->
				RN.equals(59).should.equal false
				RN.equals(60).should.equal true
				RN.equals(61).should.equal false

		describe 'Simple Percentage Comparison', ->
			RN = new RestrictedNumber 0, 100, 55, 5

			it 'Should correctly report %> correctly', ->
				RN.greaterThanPercent(59).should.equal true
				RN.greaterThanPercent(60).should.equal false
				RN.greaterThanPercent(61).should.equal false

			it 'Should report %< correctly', ->
				RN.lessThanPercent(59).should.equal false
				RN.lessThanPercent(60).should.equal false
				RN.lessThanPercent(61).should.equal true

			it 'Should report %>= correctly', ->
				RN.gtePercent(59).should.equal true
				RN.gtePercent(60).should.equal true
				RN.gtePercent(61).should.equal false

			it 'Should report %<= correctly', ->
				RN.ltePercent(59).should.equal false
				RN.ltePercent(60).should.equal true
				RN.ltePercent(61).should.equal true

			it 'Should report %= correctly', ->
				RN.equalsPercent(59).should.equal false
				RN.equalsPercent(60).should.equal true
				RN.equalsPercent(61).should.equal false

		describe 'Complex Value Comparison', ->
			MiddleRN = new RestrictedNumber 0, 100, 50, 5

			it 'Should report atMax when current + boost >= max', ->
				BoostedMaxRN = new RestrictedNumber 0, 100, 95, 5
				BoostedAboveMaxRN = new RestrictedNumber 0, 100, 100, 5
				AtMaxRN = new RestrictedNumber 0, 100, 100

				BoostedMaxRN.atMax().should.equal true
				BoostedAboveMaxRN.atMax().should.equal true
				AtMaxRN.atMax().should.equal true
				MiddleRN.atMax().should.equal false

			it 'Should report atMin when current + boost <= min', ->
				BoostedMinRN = new RestrictedNumber 0, 100, 5, -5
				BoostedBelowMinRN = new RestrictedNumber 0, 100, 0, -5
				AtMinRN = new RestrictedNumber 0, 100, 0

				BoostedMinRN.atMin().should.equal true
				BoostedBelowMinRN.atMin().should.equal true
				AtMinRN.atMin().should.equal true
				MiddleRN.atMin().should.equal false

	describe 'Mutator Functionality', ->
		describe 'Simple Value Mutators', ->
			it 'Should add correctly and not exceed max', ->
				RN = new RestrictedNumber 0, 100, 50
				RN.add(10).getTotal().should.equal 60
				RN.add(50).getTotal().should.equal 100

			it 'Should subtract correctly and not fall below min', ->
				RN = new RestrictedNumber 0, 100, 50
				RN.sub(10).getTotal().should.equal 40
				RN.sub(50).getTotal().should.equal 0

			it 'Should go to the maximum correctly', ->
				RN = new RestrictedNumber 0, 100, 50
				RN.toMaximum().getTotal().should.equal 100

			it 'Should go to the minimum correctly', ->
				RN = new RestrictedNumber 0, 100, 50
				RN.toMinimum().getTotal().should.equal 0

			it 'Should set a value correctly', ->
				RN = new RestrictedNumber 0, 100, 50
				RN.set(77).getTotal().should.equal 77

		describe 'Simple Percent Mutators', ->
			it 'Should add percentage values correctly', ->
				RN = new RestrictedNumber 0, 200, 50
				RN.addPercent(10).getTotal().should.equal 70

			it 'Should sub percentage values correctly', ->
				RN = new RestrictedNumber 0, 200, 50
				RN.subPercent(10).getTotal().should.equal 30

			it 'Should set percentage values correctly', ->
				RN = new RestrictedNumber 0, 200, 50
				RN.setToPercent(10).getTotal().should.equal 20

		describe 'Complex Value Mutators', ->
			it 'Should add to both bound and current correctly', ->
				RN = new RestrictedNumber 0, 100, 50
				RN.addAndBound 10
				RN.getTotal().should.equal 60
				RN.maximum.should.equal 110

			it 'Should sub to both bound and current correctly', ->
				RN = new RestrictedNumber 0, 100, 50
				RN.subAndBound 10
				RN.getTotal().should.equal 40
				RN.minimum.should.equal -10

	describe 'Conversion Functionality', ->
		it 'Should convert to a percent properly', ->
			RN = new RestrictedNumber 0, 100, 77
			RN.asPercent().should.equal 77

			RN2 = new RestrictedNumber 0, 200, 50
			RN2.asPercent().should.equal 25

	describe 'Chain Functionality', ->
		it 'Should chain methods correctly', ->
			RN = new RestrictedNumber 0, 100, 50
			expect(RN.add 10).to.be.an.instanceOf RestrictedNumber
			expect(RN.addAndBound 10).to.be.an.instanceOf RestrictedNumber
			expect(RN.set 50).to.be.an.instanceOf RestrictedNumber
			expect(RN.sub 10).to.be.an.instanceOf RestrictedNumber
			expect(RN.subAndBound 10).to.be.an.instanceOf RestrictedNumber
			expect(RN.toMaximum()).to.be.an.instanceOf RestrictedNumber
			expect(RN.toMinimum()).to.be.an.instanceOf RestrictedNumber

	describe 'Aliases', ->
		it 'Should alias getTotal to getValue', ->
			RN = new RestrictedNumber 0, 100, 50
			RN.getTotal().should.equal RN.getValue()
