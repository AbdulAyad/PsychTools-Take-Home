Psychology Tools Take Home Test - Abdulrahman Ayad

Steps to run:
1) open terminal in vs code of cloned repository
2) "cd psych"
3) "npm install"
4) "npm run build"
5) "composer install"
6) "composer update" (if needed)
7) if any errors in the process, try updating php, it requires 8.2.0^
8) "composer run dev" then head to localhost:8000
9) sign up, you can test logging in by logging out on the top left then logging back in


Summary:
I utilised the laravel starter kit which came pre-equipped with a lot of tools ready, 
I wanted to make that known as there are obvioulsy a lot of files that are not being used. 
I deleted the majority of at least the frontend extra files and kept the ones I worked on
but there are still quite a few backend files that were needed for authentication.
I utilised best practices when creating the eloquent models and made clear the relationships
between the users table, the posts tbale, and the likes table. I separate the likes into a separate
table because it allows more flexibility for future analysis if we need to simply check a users likes 
or a posts likes separately. I made sure everything loads seamlessly by utilising optimistic updates
locally such as the case in the like function and also adding a debounce function for the search parameter.
The starter kit came pre equipped with a built in sqlite database which I used as it's quicker than setting up
a separate mysql database but it works just as a mysql database would. Upon beginning this task, one of my main 
tasks was ensuring a comfortable ui for desktop and mobile and anything in between, while simple, I hope it meets
your expectations.

What I would have improved:
Given more time, there would have been several improvements, especially in the UI area. I skipped out on a bit of 
loading animations as well as success and error popups. Furthermore, there is a lot of room to grow and include more
features such as editing a post, deleting a post and potentially more filter options. There are also a lot to improve on the authentication 
piece, including verfiying emails, adding a password reset option and also persisting the user longer than the laravel sessiont ime of 2 hours.
I hope this would give you a little snippet of my capabilities and show you my willingness to lear new technologies and 
display effort for the task at hand, a lot of what I worked on in this task was new to me but I made sure to udnerstand everything
I did and not rely on prebuilt code.

Thank you!
Abdul
