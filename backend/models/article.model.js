const mongoose = require('mongoose');
mongoose.pluralize(null);

const ArticleSchema = mongoose.Schema(
{
    title: { type: String, required: false},
    content: { type: String, required: false},
    tags: { type: Array, required: false,},
    image: { type: String, required: false},
    source: { type: String, required: false},
    visible: { type: Boolean, default: true},
    published_at: { type: String, required: false}
});

module.exports = mongoose.model('Article', ArticleSchema);