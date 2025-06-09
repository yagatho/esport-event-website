const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Photo upload directory
const uploadDir = path.join(process.cwd(), '..', 'frontend', 'public', 'uploads', 'teams');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'team-' + uniqueSuffix + ext);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Nieprawidłowy typ pliku. Dozwolone tylko obrazy (JPEG, PNG)'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB
    }
});

// File validation
const uploadTeamPhotoWithErrorHandling = (req, res, next) => {
    upload.single('teamPhoto')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    success: false,
                    message: 'Plik jest zbyt duży. Maksymalny rozmiar to 3MB.'
                });
            }
            return res.status(400).json({
                success: false,
                message: `Błąd przesyłania pliku: ${err.message}`
            });
        } else if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        next();
    });
};

// Export middleware
exports.uploadTeamPhoto = uploadTeamPhotoWithErrorHandling;