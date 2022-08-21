module.exports = {
    web: {
        port: process.env.PORT || 3000,
        viewsRoot: process.cwd() + '/src/presentation/web/views'
    },
    cloud: {
        yandex: {
            storage: {
                id: process.env.YANDEX_STORAGE_KEY,
                key: process.env.YANDEX_STORAGE_SECRET,
                bucket: process.env.YANDEX_STORAGE_BUCKET,
                region: process.env.YANDEX_STORAGE_REGION,
            },
            speechkit: {
                apiKey: process.env.YANDEX_SPEECHKIT_API_KEY,
            },
        },
    },
    storage: {
        fileName: process.env.STORAGE_FILE_NAME || 'storage.json',
    },
};
