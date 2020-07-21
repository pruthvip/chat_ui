epifiJs.templates = (function () {
    const ChatListItem = ({ firstName, lastName, profileImage, msgToShow, timeString, notificationCount, link }) => {
        return (
            `
            <div class="chat-item flex-row">
                <div class="chat-item__section">
                    <div class="chat-item__image">
                        <a href="#" class="js-anchor-tag" data-href=${link}> 
                            <img src = ${profileImage} title = "${firstName + '' + lastName}'s image" />
                        </a>
                    </div>
                    <div class="chat-item__text">
                        <div class="chat-item__name">
                            <a href="#" class="js-anchor-tag" data-href=${link}> 
                                ${firstName}
                            </a>
                            ${' ' + lastName}
                        </div>
                        <div class="chat-item__msg">
                            ${msgToShow}
                        </div>
                    </div>
                </div>
                <div class="chat-item__section flex-col">
                    <div class="chat-item__time">
                        ${timeString}
                    </div>
                    ${
                        notificationCount ? (
                            `<div class="chat-item__notifications_count">
                                ${notificationCount}
                            </div>`
                        ) : ''
                    }
                    
                </div>
            </div>
        `
        )
    };


    const FavouriteItem = ({ firstName, link, isNotificationPresent, profileImage }) => {
        return (
            `<div class="favourite-item flex-col">
                <a href="#" class="js-anchor-tag" data-href=${link}> 
                    <div class="favourite-item__image ${isNotificationPresent ? 'favourite-item__image--notification' : ''}">
                        <img src = ${profileImage} title = "${name}'s image" />
                    </div>
                    <div class="favourite-item__name">
                        ${firstName}
                    </div>
                </a>
            </div>
        `
        )
    };


    const MessageItem = ({ firstName, lastName, timeStamp, timeFormat, profileImage, showImage, floatRight, msg }) => {
        return (
            `
            <div class="message-item ${floatRight ? 'message-item--right' : ''}">
                <div class="message-item__main-content">
                    ${
            showImage ? (
                `<div class="message-item__image">
                    <img src = ${profileImage} title = ${`${firstName} ${lastName}`} />
                </div>`
            ) : ''
            }
                    <div class="message-item__msg">
                        ${msg}
                    </div>
                </div>
            </div>
        `
        )
    };

    const Title = ({ titleText, disabled = false }) => {
        return (
            `<h1 class="app__title ${disabled ? "app__title--disabled" : ''}">
            ${titleText}
        </h1>
        `
        )
    };

    return {
        ChatListItem,
        FavouriteItem,
        MessageItem,
        Title
    };
})();

