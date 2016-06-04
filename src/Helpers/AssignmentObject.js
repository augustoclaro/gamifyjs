const AssignmentObject = function (name, type, dependencies, fn) {
    this.name = name;
    this.type = type;
    this.dependencies = dependencies;
    this.fn = fn;
};