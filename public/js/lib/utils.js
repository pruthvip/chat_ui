epifiJs.utils = (function () {
    // adding a array stringify method
    // it concatenates each item and returns a string
    Array.prototype.concatContent = function() {
        let str = '';

        for (let i = 0; i < this.length; i++) {
            str = str + this[i];
        }

        return str;
    }


    const delay = (data, delay = 1) => {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(data);
            }, delay)
        })
    };

    const homeMessages = [
        {
            userId: 1,
            userDetails: {
                firstName: 'Ajala',
                lastName: 'Singh',
                profileImage: 'https://i.pravatar.cc/200?img=2',
                timeString: 'just now',
                notificationCount: 5
            },
            messages: [
                {
                    msg: 'cool!!!!',
                    userId: 12
                },
                {
                    msg: 'lore upp',
                    userId: 1
                },
                {
                    msg: 'I m fine',
                    userId: 12
                },
                {
                    msg: 'Hi How are you',
                    userId: 1
                }
            ]
        },
        {
            userId: 2,
            userDetails: {
                firstName: 'Tony',
                lastName: 'Balbova',
                profileImage: 'https://i.pravatar.cc/200?img=7',
                timeString: '12:08',
                notificationCount: 2
            },
            messages: [
                {
                    msg: 'cool!!!!',
                    userId: 12
                },
                {
                    msg: 'lore upp',
                    userId: 2
                },
                {
                    msg: 'I m fine',
                    userId: 12
                },
                {
                    msg: 'Hi How are you',
                    userId: 2
                }
            ]
        },
        {
            userId: 3,
            userDetails: {
                firstName: 'Some',
                lastName: 'name',
                profileImage: 'https://i.pravatar.cc/200?img=8',
                timeString: '12:08',
                notificationCount: 1
            },
            messages: [
                {
                    msg: 'cool!!!!',
                    userId: 12
                },
                {
                    msg: 'lore upp',
                    userId: 2
                },
                {
                    msg: 'I m fine',
                    userId: 12
                },
                {
                    msg: 'Hi How are you',
                    userId: 2
                }
            ]
        },
        {
            userId: 4,
            userDetails: {
                firstName: 'Another',
                lastName: 'pers',
                profileImage: 'https://i.pravatar.cc/200?img=9',
                timeString: '12:08',
                notificationCount: 0
            },
            messages: [
                {
                    msg: 'cool!!!!',
                    userId: 12
                },
                {
                    msg: 'lore upp',
                    userId: 2
                },
                {
                    msg: 'I m fine',
                    userId: 12
                },
                {
                    msg: 'Hi How are you',
                    userId: 2
                }
            ]
        },
        {
            userId: 5,
            userDetails: {
                firstName: 'pol',
                lastName: 'lisg',
                profileImage: 'https://i.pravatar.cc/200?img=10',
                timeString: '12:08',
                notificationCount: 0
            },
            messages: [
                {
                    msg: 'cool!!!!',
                    userId: 12
                },
                {
                    msg: 'lore upp',
                    userId: 2
                },
                {
                    msg: 'I m fine',
                    userId: 12
                },
                {
                    msg: 'Hi How are you',
                    userId: 2
                }
            ]
        },
        {
            userId: 6,
            userDetails: {
                firstName: 'Tom',
                lastName: 'Riddle',
                profileImage: 'https://i.pravatar.cc/200?img=12',
                timeString: '12:08',
                notificationCount: 0
            },
            messages: [
                {
                    msg: 'cool!!!!',
                    userId: 12
                },
                {
                    msg: 'lore upp',
                    userId: 6
                },
                {
                    msg: 'I m fine',
                    userId: 12
                },
                {
                    msg: 'Hi How are you',
                    userId: 6
                }
            ]
        },
        {
            userId: 7,
            userDetails: {
                firstName: 'Harry',
                lastName: 'S',
                profileImage: 'https://i.pravatar.cc/200?img=13',
                timeString: '12:08',
                notificationCount: 0
            },
            messages: [
                {
                    msg: 'cool!!!!',
                    userId: 12
                },
                {
                    msg: 'lore upp',
                    userId: 7
                },
                {
                    msg: 'I m fine',
                    userId: 12
                },
                {
                    msg: 'Hi How are you',
                    userId: 7
                }
            ]
        },
        {
            userId: 8,
            userDetails: {
                firstName: 'Harry',
                lastName: 'S',
                profileImage: 'https://i.pravatar.cc/200?img=14',
                timeString: '12:08',
                notificationCount: 0
            },
            messages: [
                {
                    msg: 'cool!!!!',
                    userId: 12
                },
                {
                    msg: 'lore upp',
                    userId: 8
                },
                {
                    msg: 'I m fine',
                    userId: 12
                },
                {
                    msg: 'Hi How are you',
                    userId: 8
                }
            ]
        }
    ];

    const favList = [
        {
            userDetails: {
                id: 5,
                firstName: 'pol',
                lastName: 'lisg',
                profileImage: 'https://i.pravatar.cc/200?img=10'
            },
            isNotificationPresent: false
        },
        {
            userDetails: {
                id: 6,
                firstName: 'Tom',
                lastName: 'Riddle',
                profileImage: 'https://i.pravatar.cc/200?img=12'
            },
            isNotificationPresent: true
        },
        {
            userId: 7,
            userDetails: {
                id: 7,
                firstName: 'Harry',
                lastName: 'S',
                profileImage: 'https://i.pravatar.cc/200?img=13'
            },
            isNotificationPresent: false
        }
    ]

    return {
        createStore: createStore,
        promiseSupport: promiseSupport,
        apiCall: function (url, data) {
            switch (url) {
                case 'getAllMessages': {
                    return delay(homeMessages)
                }

                case 'getFavList': {
                    return delay(favList)
                }

                case 'getUserMessages': {
                    const userId = data.id;
                    return delay(homeMessages.find(m => m.userId === userId));
                }
            }
        },
        Router: Router,
        extractUserIdFromUsr: function (url) {
            const splitUrl = url.split('/');
            return parseInt(splitUrl[splitUrl.length - 1], 10);
        },
        throttle: (func, limit) => {
            let inThrottle
            return function () {
                const args = arguments
                const context = this
                if (!inThrottle) {
                    func.apply(context, args)
                    inThrottle = true
                    setTimeout(() => inThrottle = false, limit)
                }
            }
        }
    };
})()