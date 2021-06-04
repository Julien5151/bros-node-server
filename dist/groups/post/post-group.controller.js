"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGroupRouteController = void 0;
const group_1 = require("../../models/group");
const user_1 = require("../../models/user");
const enums_1 = require("../../utils/types/enums");
const postGroupRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract group type
    const groupType = req.body.type;
    // Extract user initiating group request
    const user = res.locals.user;
    // Check that it's a real user, not dev admin
    if (!user) {
        const customError = {
            statusCode: 400,
            message: "Groups must be created using a real user",
        };
        return next(customError);
    }
    // If user is already grouped, can't create another group
    if (user.grouped) {
        const customError = {
            statusCode: 403,
            message: "User already in a group. Must leave current group before joining a new one",
        };
        return next(customError);
    }
    // Start composing the group
    try {
        const brosList = yield user_1.User.findRandomSample(enums_1.GroupSize[groupType] - 1, user.zipcode, user._id);
        // If group creation is successfull, mark all users as grouped
        // and no longer available for grouping
        const completeBrosList = [user, ...brosList];
        // List
        const completeBrosListIds = completeBrosList.map((user) => user._id);
        yield user_1.User.updateMany(completeBrosListIds, {
            $set: {
                grouped: true,
                availableForGrouping: false,
            },
        });
        // Instanciate new group
        const brosGroup = new group_1.Group({
            type: groupType,
            zipcode: user.zipcode,
            userIds: completeBrosListIds,
        });
        // Insert new group in DB
        yield brosGroup.create();
        // If group successfully created, return the created group
        return res.status(201).json(brosGroup.getPlainObject());
    }
    catch (error) {
        // If not enough user found, return 404 error
        if (error.statusCode === 404) {
            next(error);
        }
        else {
            // Other case of DB error, log the error
            console.error(error.message);
            // Return a generic message to client
            const customError = {
                statusCode: 500,
                message: "Something went wrong",
            };
            return next(customError);
        }
    }
});
exports.postGroupRouteController = postGroupRouteController;
