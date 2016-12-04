var feed = new Instafeed({
    // get: 'user',
    // userId: 297875328,
    // accessToken:'297875328.467ede5.a3dd90d528464ee3a577e2364558a00d',
    get: 'tagged',
	tagName: 'remarkabelle',
    clientId: '00651c2612fb4ef9a0d9c08c32dbf178',
    resolution:'standard_resolution',
    template: '<div class="instacontainer"><img class="instaimage" src="{{image}}" /><br><div class="instacaption">{{caption}}</div></div>',
    limit:20
});
feed.run();
