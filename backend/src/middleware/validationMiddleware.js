const InputValidator = require('../utils/InputValidator');

/**
 * Validation Rules cho các chức năng cụ thể
 */

const ValidationRules = {
  
  // Rules cho Student
  student: {
    fullName: {
      type: 'name',
      options: { required: true, minLength: 2, maxLength: 100 }
    },
    email: {
      type: 'email',
      options: { required: true, maxLength: 100 }
    },
    phoneNumber: {
      type: 'phone',
      options: { required: false, maxLength: 15 }
    },
    studentCode: {
      type: 'studentCode',
      options: { required: true, minLength: 3, maxLength: 20 }
    },
    dateOfBirth: {
      type: 'safeText',
      options: { required: true, maxLength: 10 }
    },
    classId: {
      type: 'numeric',
      options: { required: true }
    }
  },

  // Rules cho User/Auth
  auth: {
    username: {
      type: 'username',
      options: { required: true, minLength: 3, maxLength: 50 }
    },
    password: {
      type: 'password',
      options: { required: true, minLength: 6, maxLength: 100 }
    },
    email: {
      type: 'email',
      options: { required: true, maxLength: 100 }
    },
    fullName: {
      type: 'name',
      options: { required: true, minLength: 2, maxLength: 100 }
    }
  },

  // Rules cho Topic/Subject
  topic: {
    name: {
      type: 'safeText',
      options: { required: true, minLength: 2, maxLength: 200 }
    },
    description: {
      type: 'safeText',
      options: { required: false, maxLength: 1000 }
    },
    departmentId: {
      type: 'numeric',
      options: { required: true }
    },
    majorId: {
      type: 'numeric',
      options: { required: true }
    }
  },

  // Rules cho Question
  question: {
    content: {
      type: 'safeText',
      options: { required: true, minLength: 5, maxLength: 1000 }
    },
    topicId: {
      type: 'numeric',
      options: { required: true }
    }
  },

  // Rules cho Answer
  answer: {
    content: {
      type: 'safeText',
      options: { required: true, minLength: 1, maxLength: 500 }
    },
    questionId: {
      type: 'numeric',
      options: { required: true }
    }
  },

  // Rules cho Department/Major/Class
  academic: {
    name: {
      type: 'safeText',
      options: { required: true, minLength: 2, maxLength: 200 }
    },
    code: {
      type: 'alphanumeric',
      options: { required: false, maxLength: 50 }
    },
    description: {
      type: 'safeText',
      options: { required: false, maxLength: 500 }
    }
  },

  // Rules cho Change Password
  changePassword: {
    currentPassword: {
      type: 'password',
      options: { required: true, minLength: 1, maxLength: 100 }
    },
    newPassword: {
      type: 'password',
      options: { required: true, minLength: 6, maxLength: 100 }
    },
    confirmPassword: {
      type: 'password',
      options: { required: true, minLength: 6, maxLength: 100 }
    }
  }
};

/**
 * Middleware functions để sử dụng trong routes
 */
const ValidationMiddleware = {
  
  // Validate student data
  validateStudent: InputValidator.middleware(ValidationRules.student),
  
  // Validate auth data
  validateAuth: InputValidator.middleware(ValidationRules.auth),
  
  // Validate topic data
  validateTopic: InputValidator.middleware(ValidationRules.topic),
  
  // Validate question data
  validateQuestion: InputValidator.middleware(ValidationRules.question),
  
  // Validate answer data
  validateAnswer: InputValidator.middleware(ValidationRules.answer),
  
  // Validate academic structure data
  validateAcademic: InputValidator.middleware(ValidationRules.academic),
  
  // Validate change password
  validateChangePassword: InputValidator.middleware(ValidationRules.changePassword),

  // Custom validation for partial updates
  validatePartialStudent: (req, res, next) => {
    // Chỉ validate các fields có trong request
    const presentFields = {};
    const rules = {};
    
    Object.keys(ValidationRules.student).forEach(field => {
      if (req.body.hasOwnProperty(field)) {
        presentFields[field] = req.body[field];
        rules[field] = ValidationRules.student[field];
      }
    });

    const validationResult = InputValidator.validateObject(presentFields, rules);
    
    if (!validationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu đầu vào không hợp lệ',
        errors: validationResult.errors
      });
    }
    
    // Merge sanitized data back to req.body
    Object.keys(validationResult.sanitized).forEach(field => {
      req.body[field] = validationResult.sanitized[field];
    });
    
    next();
  },

  // Validate partial topic data
  validatePartialTopic: (req, res, next) => {
    const presentFields = {};
    const rules = {};
    
    Object.keys(ValidationRules.topic).forEach(field => {
      if (req.body.hasOwnProperty(field)) {
        presentFields[field] = req.body[field];
        rules[field] = ValidationRules.topic[field];
      }
    });

    const validationResult = InputValidator.validateObject(presentFields, rules);
    
    if (!validationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu đầu vào không hợp lệ',
        errors: validationResult.errors
      });
    }
    
    Object.keys(validationResult.sanitized).forEach(field => {
      req.body[field] = validationResult.sanitized[field];
    });
    
    next();
  },

  // Validate partial question data
  validatePartialQuestion: (req, res, next) => {
    const presentFields = {};
    const rules = {};
    
    Object.keys(ValidationRules.question).forEach(field => {
      if (req.body.hasOwnProperty(field)) {
        presentFields[field] = req.body[field];
        rules[field] = ValidationRules.question[field];
      }
    });

    const validationResult = InputValidator.validateObject(presentFields, rules);
    
    if (!validationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu đầu vào không hợp lệ',
        errors: validationResult.errors
      });
    }
    
    Object.keys(validationResult.sanitized).forEach(field => {
      req.body[field] = validationResult.sanitized[field];
    });
    
    next();
  },

  // Validate partial academic data
  validatePartialAcademic: (req, res, next) => {
    const presentFields = {};
    const rules = {};
    
    Object.keys(ValidationRules.academic).forEach(field => {
      if (req.body.hasOwnProperty(field)) {
        presentFields[field] = req.body[field];
        rules[field] = ValidationRules.academic[field];
      }
    });

    const validationResult = InputValidator.validateObject(presentFields, rules);
    
    if (!validationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu đầu vào không hợp lệ',
        errors: validationResult.errors
      });
    }
    
    Object.keys(validationResult.sanitized).forEach(field => {
      req.body[field] = validationResult.sanitized[field];
    });
    
    next();
  }
};

module.exports = {
  ValidationRules,
  ValidationMiddleware,
  InputValidator
};
