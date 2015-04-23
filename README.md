# ActiveWriter

When testing step downs and how apps respond, it's useful to have an app which is regularly reading and writing. ActiveWriter is a Node.js/Mongoose
application which does just that. It writes an overly simple collection (you may wish to enhance the schema with more content) and then randomly goes back and modifies it. Run this script and then step down your replica set a few times. Where there is an issue in the MongoDB client stack with stepdowns, this script should highlight it by emitting errors or stalling.
