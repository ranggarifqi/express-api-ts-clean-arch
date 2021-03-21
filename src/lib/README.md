# Lib Folder

We treat this folder as the most outer layer of Clean Arch Diagram. Which is Frameworks & Drivers

You can store any of your self made library here.
And, if you want to do some domain level interface implementation. Please do it here


For example:
1) Email service.
If you want to create an email service, or different email service implementation. You need to create the domain level interface first (Let's say DEmailService). And then you create a folder here (for ex: nodemailer), and implement that interface.