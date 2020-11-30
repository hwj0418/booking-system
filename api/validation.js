const Joi = require('@hapi/hapi');
const today = new Date();

// Customer Validation
const customerValidation = (customer) => {
    const schema = {
        firstname: Joi.string().min(1).max(100).require(),
        lastname: Joi.string().min(1).max(100),
        gender: Joi.string().min(1).max(100).require(),
        visit_date: Joi.date().min(today).require(),
        phone: Joi.number().min(10).max(13).require(),
        is_member: Joi.boolean.require()
    }
    return Joi.validate(customer, schema);
}

// Staff info Validation
const staffValidation = (staff) => {
    const schema = {
        title: Joi.string().min(3).require(),
        firstname: Joi.string().min(6).require(),
        lastname: Joi.string().min(6).require(),
        gender: Joi.string().min(1).require(),
        phone: Joi.number().min(10).require()
    }
    return Joi.validate(staff, schema);
}

// Staff info Validation
const memberValidation = (member) => {
    const schema = {
        firstname: Joi.string().min(6).max(100).require(),
        lastname: Joi.string().min(6).max(100).require(),
        gender: Joi.string().min(1).require(),
        phone: Joi.number().min(10).max(13).require(),
        store_credit: Joi.number().min(0),
        insurance_credit: Joi.number().min(0),
    }
    return Joi.validate(member, schema);
}

// Role info Validation
const roleValidation = (role) => {
    const schema = {
        title: Joi.string().min(1).max(100).require(),
        description: Joi.string().max(255)
    }
    return Joi.validate(role, schema);
}

// Visit info Validation
const visitValidation = (visit) => {
    const schema = {
        customer_id: Joi.number().min(1).max(100).require(),
        service: Joi.string().min(1).max(100),
        therapist_id: Joi.number().min(1).max(100),
        service_fee: Joi.number(),
        pay_method: Joi.string().min(4).require(),
        date: Joi.date().min(today).require()

    }
    return Joi.validate(visit, schema);
}



module.exports.customerValidation = customerValidation;
module.exports.staffValidation = staffValidation;
module.exports.memberValidation = memberValidation;
module.exports.roleValidation = roleValidation;
module.exports.visitValidation = visitValidation;