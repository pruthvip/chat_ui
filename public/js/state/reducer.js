// initial state
epifiJs.AppReducer = (function () {
    const _initialAppState = {
        usersMessages: [],
        favList: [],
        currentLoggedInUser: 12,
        showLoader: false,
        currentChatUser: null
    };

    const { GET_ALL_MESSAGES, GET_FAV_LIST, SHOW_LOADER, ADD_CHAT_MSG, FILTER_CHAT_MSG } =  epifiJs.CONSTANTS;

    function AppReducer(state = _initialAppState, action) {
        switch (action.type) {
            case GET_ALL_MESSAGES: {
                return {
                    ...state,
                    showLoader: false,
                    usersMessages: action.data.usersMessages,
                    copyOfMessages: action.data.usersMessages
                }
            }

            case GET_FAV_LIST: {
                return {
                    ...state,
                    favList: action.data.favList
                }
            }

            case SHOW_LOADER: {
                return {
                    ...state,
                    showLoader: true,
                }
            }

            case ADD_CHAT_MSG: {
                const { msg, senderId, recipientId } = action.data;
                const newUserMsges = state.usersMessages.map(um => {
                    if (um.userId === recipientId) {
                        um.messages.push({
                            msg: msg,
                            userId: senderId
                        })
                    }

                    return um;
                })

                return {
                    ...state,
                    usersMessages: newUserMsges
                }
            }

            case FILTER_CHAT_MSG: {
                const { enteredText } = action.data;
                const newUserMsges = state.copyOfMessages.filter(um => {
                    return um.messages.some(m => m.msg.includes(enteredText));
                })

                return {
                    ...state,
                    usersMessages: newUserMsges
                }
            }
        }
    }

    return AppReducer;
})();
