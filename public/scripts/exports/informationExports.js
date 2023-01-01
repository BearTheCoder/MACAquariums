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
  Each post can be changed and delete in the "edit posts" module.
`},
  {
    name: "Gallery Images",
    info: `
  All gallery images are hosted on the homepage, front and center. Obviously, this can cause some janky-ness if you don't follow some rules.
  Try to ensure all images are the same dimensions. As a rule of thumb, try to ensure all images are 1920x1080 or similar. While other image formats will work, it probably won't look very good.
  This is the only client participation that I ask for. If you have a few portait images you want to display on the website, combine them with some other ones and make a landscape image.
  That or live with a slightly janky home page, I'll do my best to make sure it looks as good as possible no matter what you do, but if you want it looking it's best, just a little work on your end can go a long way.
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
  If each customer comes in and visits every page, you can support a whopping 62 customers before images will stop loading, but at least your website will still be useable.
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

];