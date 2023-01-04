export const information = [
  {
    name: "Categories",
    info: `
  In order to make your website experience as plesant as possible, some method of organizing the website 
  was necessary without the user (you) needing to learn something new. 

  <br><br>This is the category system.<br><br> 
  
  With categories, I can programmatically organize the side of the website that your customer sees.
  What does this offer? You, the website owner has a user experience similar to instagram or facebook. 
  Also, it's cheap. One program to rule them all, and no developer you have to keep on payroll. 
  But you sacrafice customizability. 
  You win some and you lose some. 
`},
  {
    name: "Importance Values",
    info: `
  Importance values are not visible to the customer.
  <br><br>
  Importance values determine how each category is organized. 
  These importance values are sorted from low to high, meaning the lower the number 
  the higher up on the page it is when a customer first clicks the page. 
  This feature was intended to give you, the client, better control over organizing your page 
  without you having to learn something new, and without me, the developer, from having to spend months 
  on an interface that is way to advance for what the website actually is. 
  If you do not know what importance value to create at the time of posting, the importance value can be changed 
  later in the "edit posts" section. 
  
`},
  {
    name: "Posts",
    info: `
  Similar to Instagram and Pinterest, your website is a "content container".
  <br><br>
  Through the "post" module you can create new posts that will be visible to the customer through the front end of the website.
  Each "post" lives seperately and can be sorted seperately from each other. This is done through importance values and categories.
  Each post can be changed and deleted in the "edit posts" module.
`},
  {
    name: "Gallery Images",
    info: `
  All gallery images are hosted on the homepage, front and center. These can be anything and will be shown next to the mission statement. There is no way to delete one picture from 
  the gallery, instead you have to delete all photos from the gallery and start over. Maybe this was done intentionally, maybe I didn't want to program a method for you to 
  edit individual gallery images. The world will never know.
  <br><br>
  The way I see it, the gallery should be used as a gerenal showcase of new and important things that you have to offer and should be changed regularly 
  to keep insterest over time. Hence, clear your entire gallery, upload new images, start fresh everytime with new things.
`},
  {
    name: "Category Images",
    info: `
  Category images are what is shown on the homepage and should all encompase everything that the category stands for. Make sure the image that you choose for the category 
  image is one that you are proud of. Categories will not show on the front page unless you add a category image, so unless you add one on the backend, the category will only be 
  accessible through the hamburger menu (the three bars top right).
`},
  {
    name: "No Cost Website",
    info: `
  You may or may not be wondering how something like this can be hosted for free.
  <br>
  Because typically, whenever you have any sort of server space registered to your name, generally there are hosting costs.
  Well, this is free thanks to, in part, by people much larger than you. Your website and database is hosted on Google's Firebase.
  <br><br>
  Google.
  <br><br>
  Yes that Google.
  <br>
  This means that they are hosting services like YouTube, Google, and other big business that are paying hundreds of thousands, if not millions of dollars in hosting costs.
  Which means they can give away some server space for free because a small business will hardly effect their server space.
  <br><br>
  This being said, there is a limit to how much your website can be used.
  There is a full list at the link <a href="https://firebase.google.com/pricing" class="linkHoverColor" style="padding: 0;letter-spacing: 0px;font-weight: 100;font-size: 16px;font-weight: 200;">here</a>.
  Though there is a lot that you will never reach in those limits, so I will paint out the important stuff here.
  <br><br>
  1.) Document Reads: 50,000 reads per day.
  <br>
  As a rule of thumb, each time a person loads a page on your website, you can assume 2-3 reads per page.
  <br>
  This means if a customer looks at every page on your website, each customer is about 60 reads, which means you can handle about 800 customers a day.
  If you reach this limit, your website will not work at all.
  <br><br>

  2.) Cloud Storage Limit: 5GB.
  <br>
  This is self explanitory, I've given you the ability to upload images. You can upload up to 5GB of images before you will have to delete some or experience issues.
  <br><br>

  3.) Cloud Storage Downloads: 50,000 per day.
  <br>
  This read limit is the same as the "document reads" limit but on crack. Every image that is displayed to you and the customer is downloaded when the customer loads the page.
  <br>
  Meaning, if you have 10 gallery images, 5 category images per category, 20 categories on one page, and 20 pages;
  <br>
  If each customer comes in and visits every page, you can support a whopping 62 customers a day before images will stop loading, but at least your website will still be useable.
  <br><br>

  4.) Cloud Storage Download Limit: 1GB.
  <br>
  Related to the last point, each image has a size, each image needs to be downloaded from cloud storage. You can download 1GB a day. Simple math.
  <br><br>

  Once you break past these limits, your website will no longer work properly. Fortunately, the most pressing of the limits are based around cloud storage, which is much cheaper to deal with over database space.
  <br>
  If you notice website issues more frequently because of this, it may be time to pay for hosting services.
  <br>
  In which case we will need to discuss migrating. But that is a problem for future us.
  Also, if you have enough customers a day to break these limits, I'm sure you'll be able to afford hosting costs.
`},
  {
    name: "Mission Statement",
    info: `
    I'm calling this a mission statement, but mainly this "mission statement" is the message that all customers will see when they first enter your website. This doesn't 
    have to be some gandiose statement that inspires the masses, it could be a simple as an announcement about a sale on shrimp. Your choice, just keep in mind it is 
    front and center on your website, so it is probably best to ensure that it's something that NEEDS to be said. There is a 500 character limit.
    `
  },
  {
    name: "Contact Page",
    info: `
    Through the contact page people can contact you through the website, get your business phone number, get your business email, and read a quick PERSONAL bio about yourself. 
    You can update this information at anytime if anything changes in the future. All messages can be seen through the built in messaging client. 
    `
  },
  {
    name: "Privacy Agreement",
    info: `
    The privacy agreement on your website is a generic privacy agreement that was generated by termly.io. You need to read the privacy agreement, 
    make changes, and contact me about those changes so I can update the website accordingly. Even better, contact a lawyer and have him write you a privacy agreement. 
    <br><br>
    <strong>Is this important?</strong> Probably not.
    <br><br>
    Privacy agreements are there to disclose intent for users personal data. Your website does not use ANY user data, so, you probably don't need to worry about this. But, I am not 
    a lawyer and this is not legal advice. Just a word of caution.
    `
  },
  {
    name: "Terms of Service",
    info: `
    The terms of service are far more important than the privacy agreement. Basically, the website is a space that you own and you are responsible for. The terms of
    service cover everything that happens on the website. Imagine you upload a picture of a clown to your gallery, obviously an odd choice for an aquarium website, 
    but what you didn't know is that you just had a customer that is deathly allergic to unexpected photos of clowns. The terms of service is there to ensure that their 
    weird allergy is not your fault. This being said, you need to read the Terms of Service as it was an auto generated TOS from termsfeed.com. True to how I live my real life, 
    I didn't read the terms of service, I just filled out a form and uploaded it as an example for you to base your REAL terms of service off of. I am not a lawyer, this is not 
    legal advice. If you are worried about the TOS being legal, you need to contact a lawyer.
    `
  },
  {
    name: "Contact the Developer",
    info: `
    Since I did the project for cheap, and since we are friends, I assume I'll probably end up working on the website more and more even after I collect payment. The developer 
    link is a little payment for myself. It is stashed at the very bottom of the page, but it's a little self promo that people can find if they go looking hard enough. ;) 
    The more visitors you have, the more promotion I will get, hopefully making me more money in the long run. (and honestly, if it is a huge deal I can remove it)
    `
  },
  {
    name: "The Future",
    info: `
    I will fix just about any bug you find, just let me know. Features on the other hand are something that need to be discussed. If you want me to add large features in 
    the future, I will probably want payment depending on how involved I believe the new feature to be, though that is always something to be discussed. After collecting payment 
    for this website, I will offer one change and add one feature for free, obviously I can't read your mind and envision exactly what you want. So, this is intended to at least 
    bring us closer to the same idea.
    `
  },
];