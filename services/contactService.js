const Contact = require("./schemas/contactSchema");

const getAllContacts = async () => {
    return Contact.find()
};

const getContactById = (id) => {
    return Contact.findById({_id: id})
};

const createContact = ({name, email, phone}) => {
    return Contact.create({name, email, phone})
}

const updateExistingContact = async ({id, toUpdate}) => {
    const contact = await Contact.findById({_id: id})
    if(!contact) return null;

    Object.keys(toUpdate).forEach((value) => {
        contact[value] = toUpdate[value]
    })
    await Contact.save()
    return Contact;
}

const deleteContact = (id) => {
    return Contact.findByIdAndRemove({_id: id});
}

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateExistingContact,
    deleteContact,
};