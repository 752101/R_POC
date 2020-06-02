needs(ggplot2)
needs(readxl)
needs(ggthemes)
attach(input[[1]])
data<-read_excel(first)
View(data)
needs(tcltk)
windows()     #Use X11() or quartz() if on linux or mac.
ggplot(data,aes(x=data$Volume)) + geom_line(aes(y=data$Mean))+xlab('Volume')+ylab('Mean')+theme_gdocs()
prompt  <- "hit spacebar to close plots"
extra   <- "some extra comment"
capture <- tk_messageBox(message = prompt, detail = extra)