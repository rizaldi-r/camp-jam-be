"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBy = exports.SortOrder = exports.SortBy = void 0;
var SortBy;
(function (SortBy) {
    SortBy["CREATED_AT"] = "createdAt";
    SortBy["UPDATED_AT"] = "updatedAt";
    SortBy["TITLE"] = "title";
})(SortBy || (exports.SortBy = SortBy = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "asc";
    SortOrder["DESC"] = "desc";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
var SearchBy;
(function (SearchBy) {
    SearchBy["TITLE"] = "title";
    SearchBy["INSTRUCTOR_NAME"] = "instructorName";
})(SearchBy || (exports.SearchBy = SearchBy = {}));
//# sourceMappingURL=enrollments.repository.interface.js.map