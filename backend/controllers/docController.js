const Document = require('./documentSchema');

exports.getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ owner: req.user.id });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.createDocument = async (req, res) => {
    const { title, content } = req.body;

    try {
        const document = new Document({
            title,
            content,
            owner: req.user.id,
        });

        await document.save();
        res.status(201).json(document);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateDocument = async (req, res) => {
    const { content } = req.body;

    try {
        const document = await Document.findById(req.params.id);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        if (document.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        document.content = content;
        await document.save();
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};