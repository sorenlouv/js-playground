const Container = function(x) {
	this.__value = x;
}

Container.of = function(x) {
	return new Container(x)
}

Container.prototype.map = function(f) {
	return Container.of(f(this.__value))
}

const ret = Container.of(3).map(function(value){
	return value + 2;
});

console.log(ret)