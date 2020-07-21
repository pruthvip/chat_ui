epifiJs.components = (function () {
    const { ChatListItem, FavouriteItem, MessageItem } = epifiJs.templates;

    const ChatList = (userMessages) => {
        const chatItemsHtml = userMessages.map(details => {
            const { firstName, lastName, profileImage, timeString, notificationCount } = details.userDetails;
            const msg = details.messages[0].msg;

            return `<li class="chat-list__item">${ChatListItem({
                firstName,
                lastName,
                profileImage,
                msgToShow: msg,
                timeString,
                notificationCount,
                link: `/chat/${details.userId}`
            })}</li>`
        }).concatContent();

        return (
            `
                <ul class="chat-list">
                    ${chatItemsHtml}
                </ul>
            `
        )
    };

    const FavouritesList = (favList) => {
        const FavListHtml = favList.map(details => {
            const { userDetails, isNotificationPresent } = details;
            const { firstName, lastName, profileImage, id } = userDetails;

            return `<li class="fav-list__item">${FavouriteItem({
                firstName, lastName, link: `/chat/${id}`, isNotificationPresent, profileImage
            })}</li>`
        }).concatContent();

        return (
            `
                <div>
                    <div>Favourites</div>
                    <ul class="fav-list flex-row">
                        ${FavListHtml}
                    </ul>
                </div>  
            `
        ) 
    }

    const ChatMsgesList = (messages, userDetails, currentLoggedInUser) => {
        const { firstName, lastName, profileImage } = userDetails;

        const msgesHtml = messages.map(m => {
            const { msg, userId, timeStamp } = m;

            return `<li class="chat-list__item">${
                MessageItem({
                firstName, lastName, profileImage, msg, timeStamp, showImage: currentLoggedInUser !== userId,
                    floatRight: currentLoggedInUser === userId
            })}</li>`
        }).concatContent();


        return (
            `<ul>
                ${msgesHtml}
            </ul>`
        )

    }

    IndividualChatMsges = (userMsgDetails, currentLoggedInUser) => {
        return (
            `
                <div class="user-chat-msg-container" id="js-user-chat-msg">
                    ${ChatMsgesList(
                        userMsgDetails.messages,
                        userMsgDetails.userDetails,
                        currentLoggedInUser
                    )}
                </div>
            `
        )
    }


    const ChatInputBox = () => {
        return (
            `
                <div class="chat-input-container" id="js-chat-input-container">
                    <textarea id="js-chat-input" name="chat-input" 
          rows="1" class="chat-input-box">
</textarea>

                    <button id="js-chat-submit-btn" class="chat-input__action">
                        <i class="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                </div>
            `
        )
    };

    const RenderChatHeader = (usersMessages) => {
        const { userDetails } = usersMessages;
        return (
            `
                <div class="chat-user__header">
                    <a href="#" class="js-anchor-tag" data-href="/"> 
                        <i class="fa fa-long-arrow-left chat-user__header__icon" aria-hidden="true"></i>
                    </a>
                    <div class="chat-user__header__text">
                        ${userDetails.firstName} ${userDetails.lastName} 
                        <div class="chat-user__header__sub-title">
                            Active now <div class="green-dot"></div>
                        </div>
                    </div>
                </div>
            `
        )
    }

    const RenderSearchBtn = () => {
        return (
            `
                <div class="chat-search">
                    <input id="js-search-chat" name="search-chat-text" class="chat-search__input" /> 
                    <i class="fa fa-search" aria-hidden="true"></i>
                </div>
            `
        )
    };

    const RenderTabsHeader = () => {
        const tabs = [
            {
                title: 'Messages',
                isActive: true
            },
            {
                title: 'Calls',
                isActive: false
            },
            {
                title: 'Groups',
                isActive: false
            }
        ]

        const tabsHtml = tabs.map(t => {
            const { title, isActive } = t;

            return `<li class="tab-list__item ${isActive ? 'tab-list__item--active' : ''}">
                    ${title}
                </li>`
        }).concatContent();


        return (
            `
                <div class="tab-list__header">
                    <ul class="tab-list">
                        ${tabsHtml}
                    </ul>
                </div>
            `
        )
    };
 
    return {
        ChatList,
        FavouritesList,
        IndividualChatMsges,
        ChatInputBox,
        RenderChatHeader,
        RenderSearchBtn,
        RenderTabsHeader
    };
})();

