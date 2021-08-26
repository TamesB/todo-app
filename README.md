# Introduction
A web application to create multiple ToDo lists, keeping track of your ToDo's and completing them. Accessible on every device with your personal account, no downloads.

## [Live Demo](http://todoboon.herokuapp.com/)

# Features
- Full authentication (Login, Register, Log out)
- Add personal TODO Lists (Work, Housekeeping, etc...)
- Add/Delete personal TODO items to these lists
- Tap on added TODO item to toggle completion
- Failsafe notification messages (empty form inputs, password matching)
- Fully responsive

# Technologies
- Backend: Django REST
- Frontend: React Hooks, Redux, and Semantic UI

# Deploy to Heroku
This application is Heroku-ready. Deploy environment with GitHub repo and set environment variables `DEBUG`, `DISABLE_COLLECTSTATIC`, `DATABASE_URL` and `SECRET_KEY`
