var assert = require("assert"), doT = require("../doT");

describe('doT', function(){
	var basictemplate = "<div>{{!it.foo}}</div>",
		basiccompiled = doT.template(basictemplate),
		definestemplate = "{{##def.tmp:<div>{{!it.foo}}</div>#}}{{#def.tmp}}",
		definescompiled = doT.template(definestemplate);

	describe('#template()', function(){
		it('should return a function', function(){
		   assert.equal("function", typeof basiccompiled);
		});
	});

	describe('#()', function(){
		it('should render the template', function(){
		   assert.equal("<div>http</div>", basiccompiled({foo:"http"}));
		   assert.equal("<div>http:&#47;&#47;abc.com</div>", basiccompiled({foo:"http://abc.com"}));
		   assert.equal("<div>{{!it.foo}}</div>", basiccompiled({}));
		});
	});

	describe('defines', function(){
		it('should render define', function(){
		   assert.equal("<div>http</div>", definescompiled({foo:"http"}));
		   assert.equal("<div>http:&#47;&#47;abc.com</div>", definescompiled({foo:"http://abc.com"}));
		   assert.equal("<div>{{!it.foo}}</div>", definescompiled({}));
		});
	});
});

describe('doT Extended', function(){
	var
		interpolatetemplate = "<div>{{=it.foo}}</div>",
		interpolatecompiled = doT.template(interpolatetemplate);
		namespacetemplate = "<div>{{=it.foo}}{{=part.foo}}</div>",
		namespacecompiled = doT.template(namespacetemplate),
		iterationtemplate = "<div>{{~it.foo :value:index}}{{=value}}{{~}}</div>",
		iterationcompiled = doT.template(iterationtemplate),
		nestedtemplate = "<div>{{!it.f.o.o}}</div>"
		nestedcompiled = doT.template(nestedtemplate);


	describe('#template()', function(){
		it('should return a function', function(){
		   assert.equal("function", typeof namespacecompiled);
		});
	});

	describe('#()', function(){
		it('should render the template', function(){
			assert.equal("<div>http</div>", interpolatecompiled({foo:"http"}));
			assert.equal("<div>http:&#47;&#47;abc.com</div>", interpolatecompiled({foo:"http:&#47;&#47;abc.com"}));
			assert.equal("<div>{{=it.foo}}</div>", interpolatecompiled({}));
		});
	});

	describe('namespace', function(){
		it('should render it namespace and leave part namespace intact', function(){
			assert.equal("<div>http{{=part.foo}}</div>", namespacecompiled({foo:"http"},{}));
			assert.equal("<div>http:&#47;&#47;abc.com{{=part.foo}}</div>", namespacecompiled({foo:"http:&#47;&#47;abc.com"},{}));
			assert.equal("<div>{{=it.foo}}{{=part.foo}}</div>", namespacecompiled({},{}));
		});
	});

	describe('iteration', function() {
		it('should render the iteration', function(){
			assert.equal("<div>http://abc.com</div>", iterationcompiled({foo: ['http://', 'abc.com']}, {}));
		});
	});

	describe('Nested', function() {
		it('should render the iteration', function(){
			assert.equal("<div>abc.com</div>", nestedcompiled({f: {o: {o: 'abc.com'}}}, {}));
		});
	});
});

/*describe('doT the rest of it', function(){
	var
		arraytemplate = "{{~it.foo :value:index}}<div>{{=value}}</div>{{~}}",
		arraycompiled = doT.template(arraytemplate);
		namespacetemplate = "<div>{{=it.foo}}{{=part.foo}}</div>",
		namespacecompiled = doT.template(namespacetemplate);


	describe('#template()', function(){
		it('should return a function', function(){
		   assert.equal("function", typeof arraycompiled);
		});
	});

	describe('array', function(){
		it('should render the array values', function(){
		   assert.equal("<div>http</div>", arraycompiled({foo:["http"]}));
		   assert.equal("<div>http:&#47;&#47;abc.com</div>", arraycompiled({foo:["http:&#47;&#47;abc.com"]}));
		   assert.equal("{{~it.foo :value:index}}<div>{{=value}}</div>{{~}}", arraycompiled({}));
		});
	});
});*/
