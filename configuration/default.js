module.exports = {
    web: {
        port: process.env.PORT || 3000,
        viewsRoot: './views'
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
    }

};
