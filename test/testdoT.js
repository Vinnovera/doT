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
		namespacetemplate = "<div>{{!it.foo}}{{=part.foo}}</bar>",
		namespacecompiled = doT.template(namespacetemplate);

	describe('#template()', function(){
		it('should return a function', function(){
		   assert.equal("function", typeof namespacecompiled);
		});
	});

	describe('namespace', function(){
		it('should render it namespace', function(){
		   assert.equal("<div>http{{=part.foo}}</div>", namespacecompiled({foo:"http"}));
		   assert.equal("<div>http:&#47;&#47;abc.com{{=part.foo}}</div>", namespacecompiled({foo:"http://abc.com"}));
		   assert.equal("<div>{{!it.foo}}{{=part.foo}}</bar>", namespacecompiled({}));
		});
	});
});
