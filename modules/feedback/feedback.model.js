"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackProvider = exports.Feedback = exports.FeedbackBase = exports.FEEDBACK_EMOTION_VALUES = exports.FEEDBACK_EMOTIONS = exports.FeedbackEmotion = void 0;
const auto_increment_1 = require("@typegoose/auto-increment");
const typegoose_1 = require("@typegoose/typegoose");
const class_validator_1 = require("class-validator");
const increment_constant_1 = require("../../constants/increment.constant");
const model_transformer_1 = require("../../transformers/model.transformer");
const paginate_1 = require("../../utils/paginate");
var FeedbackEmotion;
(function (FeedbackEmotion) {
    FeedbackEmotion[FeedbackEmotion["Hate"] = 1] = "Hate";
    FeedbackEmotion[FeedbackEmotion["Dislike"] = 2] = "Dislike";
    FeedbackEmotion[FeedbackEmotion["Neutral"] = 3] = "Neutral";
    FeedbackEmotion[FeedbackEmotion["Like"] = 4] = "Like";
    FeedbackEmotion[FeedbackEmotion["Love"] = 5] = "Love";
})(FeedbackEmotion = exports.FeedbackEmotion || (exports.FeedbackEmotion = {}));
const emotionMap = new Map([
    {
        value: FeedbackEmotion.Hate,
        text: FeedbackEmotion[FeedbackEmotion.Hate],
        emoji: '😠',
    },
    {
        value: FeedbackEmotion.Dislike,
        text: FeedbackEmotion[FeedbackEmotion.Dislike],
        emoji: '🙁',
    },
    {
        value: FeedbackEmotion.Neutral,
        text: FeedbackEmotion[FeedbackEmotion.Neutral],
        emoji: '😐',
    },
    {
        value: FeedbackEmotion.Like,
        text: FeedbackEmotion[FeedbackEmotion.Like],
        emoji: '😀',
    },
    {
        value: FeedbackEmotion.Love,
        text: FeedbackEmotion[FeedbackEmotion.Love],
        emoji: '🥰',
    },
].map((item) => [item.value, item]));
exports.FEEDBACK_EMOTIONS = Array.from(emotionMap.values());
exports.FEEDBACK_EMOTION_VALUES = exports.FEEDBACK_EMOTIONS.map((e) => e.value);
class FeedbackBase {
    get emotion_text() {
        return emotionMap.get(this.emotion).text;
    }
    get emotion_emoji() {
        return emotionMap.get(this.emotion).emoji;
    }
}
__decorate([
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typegoose_1.prop)({ required: true, index: true }),
    __metadata("design:type", Number)
], FeedbackBase.prototype, "tid", void 0);
__decorate([
    (0, class_validator_1.IsIn)(exports.FEEDBACK_EMOTION_VALUES),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typegoose_1.prop)({ required: true, index: true }),
    __metadata("design:type", Number)
], FeedbackBase.prototype, "emotion", void 0);
__decorate([
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(3000),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typegoose_1.prop)({ required: true, validate: /\S+/ }),
    __metadata("design:type", String)
], FeedbackBase.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Object)
], FeedbackBase.prototype, "user_name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Object)
], FeedbackBase.prototype, "user_email", void 0);
exports.FeedbackBase = FeedbackBase;
let Feedback = class Feedback extends FeedbackBase {
};
__decorate([
    (0, typegoose_1.prop)({ unique: true }),
    __metadata("design:type", Number)
], Feedback.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, typegoose_1.prop)({ default: false, index: true }),
    __metadata("design:type", Boolean)
], Feedback.prototype, "marked", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], Feedback.prototype, "remark", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Object)
], Feedback.prototype, "origin", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", String)
], Feedback.prototype, "user_agent", void 0);
__decorate([
    (0, class_validator_1.IsIP)(),
    (0, class_validator_1.IsOptional)(),
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Object)
], Feedback.prototype, "ip", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null, type: Object }),
    __metadata("design:type", Object)
], Feedback.prototype, "ip_location", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Date.now, immutable: true }),
    __metadata("design:type", Date)
], Feedback.prototype, "create_at", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Feedback.prototype, "update_at", void 0);
Feedback = __decorate([
    (0, typegoose_1.plugin)(paginate_1.mongoosePaginate),
    (0, typegoose_1.plugin)(auto_increment_1.AutoIncrementID, increment_constant_1.generalAutoIncrementIDConfig),
    (0, typegoose_1.modelOptions)({
        options: { allowMixed: typegoose_1.Severity.ALLOW },
        schemaOptions: {
            toJSON: { virtuals: true },
            toObject: { virtuals: true },
            timestamps: {
                createdAt: 'create_at',
                updatedAt: 'update_at',
            },
        },
    })
], Feedback);
exports.Feedback = Feedback;
exports.FeedbackProvider = (0, model_transformer_1.getProviderByTypegooseClass)(Feedback);
//# sourceMappingURL=feedback.model.js.map