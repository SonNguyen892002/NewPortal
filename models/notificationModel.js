const { model, Schema } = require("mongoose");

const notificationSchema = new Schema(
  {
    writerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "authors",
    },
    writerName: {
      type: String,
      required: true,
    },
    newsTitle: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

notificationSchema.index({ writerId: 1, createdAt: -1 });

module.exports = model("notification", notificationSchema);
