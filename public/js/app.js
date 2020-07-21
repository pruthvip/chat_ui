class App {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.epifiJs = epifiJs;

        this.chatSearchText = '';

        const { utils, AppReducer, CONSTANTS } = this.epifiJs;

        // binding functions
        this.renderAndAddEventListeners = this.renderAndAddEventListeners.bind(this);
        this.navigateToUrl = this.navigateToUrl.bind(this);

        // attach the router object
        this.routerInstance = new utils.Router(this.renderAndAddEventListeners);

        /**
         * Creating a simple redux store
         */
        this.storeInstance = utils.createStore(AppReducer);
        this.storeInstance.dispatch = utils.promiseSupport(this.storeInstance);
        this.storeInstance.subscribe(this.renderAndAddEventListeners);


        // Show loader
        this.storeInstance.dispatch({
            type: CONSTANTS.SHOW_LOADER
        });

        // making the api call
        this.storeInstance.dispatch(
            utils.apiCall('getAllMessages')
                .then(function (usersMessages) {
                    return {
                        type: CONSTANTS.GET_ALL_MESSAGES,
                        data: {
                            usersMessages
                        }
                    }
                })
        );

        // fav list
        this.storeInstance.dispatch(
            utils.apiCall('getFavList')
                .then(function (favList) {
                    return {
                        type: CONSTANTS.GET_FAV_LIST,
                        data: {
                            favList
                        }
                    }
                })
        );
    }

    navigateToUrl(path) {
        this.routerInstance.navigateToUrl(path)
    }


    renderHome() {
        const { utils, components } = this.epifiJs;

        const state = this.storeInstance.getState();
        if (!state) return;
        const { usersMessages, favList } = state;

        return (
            `<div id="js-app-content" class="app__content">
                ${components.RenderSearchBtn()}
                ${components.RenderTabsHeader()}
                ${components.FavouritesList(favList)}
                <div class="home_chat_list" id="js-home-chat-list">
                    ${components.ChatList(usersMessages)}
                </div>
           </div>`
        );
    }

    renderComponent(getCurrentUrl) {
        const { utils } = this.epifiJs;
        const state = this.storeInstance.getState();

        const { showLoader } = state;

        if (showLoader) {
            return null;
        }

        // render the indiviual chat page
        if (getCurrentUrl.includes('chat')) {
            const currentChatUserId = utils.extractUserIdFromUsr(getCurrentUrl);

            return this.renderIndividualChatPage(currentChatUserId);
        }

        // default
        return this.renderHome();
    }

    renderIndividualChatPage(currentChatUserId) {
        const { utils, components } = this.epifiJs;

        const state = this.storeInstance.getState();
        if (!state) return;
        const { usersMessages, currentLoggedInUser } = state;

        const currentUserMsges = usersMessages.find(u => u.userId === currentChatUserId);

        return (
            `<div id="js-app-content" class="app__content">
                ${components.RenderChatHeader(currentUserMsges)}
                ${
            components.IndividualChatMsges(currentUserMsges, currentLoggedInUser)
                }
                ${components.ChatInputBox()}
           </div>`
        );
    }

    render() {
        const getCurrentUrl = this.routerInstance.getCurrentUrl();

        let contentHtml = this.renderComponent(getCurrentUrl);
   
        this.rootElement.innerHTML = contentHtml;
    }

    addEventListeners() {
        const { utils, CONSTANTS } = this.epifiJs;

        // action btn on books
        const actionHrefItems = document.getElementsByClassName('js-anchor-tag');

        for (let i = 0; i < actionHrefItems.length; i++) {
            actionHrefItems[i].addEventListener('click', (e) => {
                e.preventDefault();
                const href = e.currentTarget.getAttribute('data-href');
                this.navigateToUrl(href);
            });
        }


        // set DOM manipulations and other calculations
        const performDomManipulations = () => {
            try {
                const appContent = document.getElementById('js-app-content');
                const homeChatList = document.getElementById('js-home-chat-list');

                if (homeChatList) {
                    const domRect = homeChatList.getBoundingClientRect();

                    homeChatList.style.height = (appContent.clientHeight - domRect.top) + 'px';
                }

                const userChatList = document.getElementById('js-user-chat-msg');
                const userChatListRect = userChatList.getBoundingClientRect();
                const chatInputContiner = document.getElementById('js-chat-input-container');

                if (userChatList) {
                    userChatList.style.height = (appContent.clientHeight - userChatListRect.top - chatInputContiner.clientHeight - 22) + 'px';
                }
            } catch (e) {
            }
        }

        // chat input btn listner
        const chatInput = document.getElementById('js-chat-input');

        if (chatInput) {
            chatInput.addEventListener('keyup', (e) => {
                chatInput.style.height = '1px';
                chatInput.style.height = (chatInput.scrollHeight) + "px";
                performDomManipulations();
            })
        }

        const chatSubmitBtn = document.getElementById('js-chat-submit-btn');

        // chat submit btn 
        if (chatSubmitBtn) {
            chatSubmitBtn.addEventListener('click', (e) => {
                const chatInput = document.getElementById('js-chat-input').value;

                const state = this.storeInstance.getState();
                const { usersMessages, currentLoggedInUser } = state;

                const currentUrl = this.routerInstance.getCurrentUrl();
                const currentChatUserId = utils.extractUserIdFromUsr(currentUrl);

                this.storeInstance.dispatch({
                    type: CONSTANTS.ADD_CHAT_MSG,
                    data: {
                        msg: chatInput,
                        senderId: currentLoggedInUser,
                        recipientId: currentChatUserId
                    }
                });

                // scoll to bottm
                const userChatList = document.getElementById('js-user-chat-msg');
                userChatList.scrollTop = userChatList.scrollHeight - userChatList.clientHeight;
            })
        }

        // chat search on text press
        const chatSearchText = document.getElementById('js-search-chat');

        const textListner = (e) => {
            const textString = e.target.value;
            this.chatSearchText = e.target.value;
            this.storeInstance.dispatch({
                type: CONSTANTS.FILTER_CHAT_MSG,
                data: {
                    enteredText: textString
                }
            });
        };

        if (chatSearchText) {
            chatSearchText.addEventListener('input', utils.throttle(textListner, 1000))
            // kepping the input focus on
            // if typing
            setTimeout(() => { 
                chatSearchText.value = this.chatSearchText;
                chatSearchText.focus();
             }, 1);
        }

        // dom reading and manipulation
        performDomManipulations();
     
    }

    renderAndAddEventListeners() {
        this.render();

        this.addEventListeners();
    }
}

const rootElement = document.getElementById('js-app-root');
const AppPage = new App(rootElement);

