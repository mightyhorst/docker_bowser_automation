FROM elgalu/selenium:latest

RUN sudo apt-get update
RUN sudo apt-get install -y nano

#                  _      
#                 | |     
#  _ __   ___   __| | ___ 
# | '_ \ / _ \ / _` |/ _ \
# | | | | (_) | (_| |  __/
# |_| |_|\___/ \__,_|\___|
#                        
#  


RUN sudo apt-get install -y nano
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
RUN sudo apt-get install -y build-essential

# -- Permissions npm global --- 
RUN mkdir ~/.npm-global
RUN npm config set prefix '~/.npm-global'
RUN export PATH=~/.npm-global/bin:$PATH
RUN source ~/.profile 
RUN NPM_CONFIG_PREFIX=~/.npm-global


#
#  _            _       
# | |          | |      
# | |_ ___  ___| |_ ___ 
# | __/ _ \/ __| __/ __|
# | ||  __/\__ \ |_\__ \
#  \__\___||___/\__|___/
#                      
#  
RUN npm install -g colors mocha selenium-webdriver
RUN npm install colors mocha selenium-webdriver
RUN npm install dotenv
RUN mkdir tests && mkdir screenshots




#  _                _        _              
# | |              | |      | |             
# | |__   __ _  ___| | _____| |_ ___  _ __  
# | '_ \ / _` |/ __| |/ / __| __/ _ \| '_ \ 
# | |_) | (_| | (__|   <\__ \ || (_) | |_) |
# |_.__/ \__,_|\___|_|\_\___/\__\___/| .__/ 
#                                    | |    
#                                    |_|    
RUN mkdir tests_backstopjs && cd $_ 
RUN npm install -g backstopjs
RUN backstop init 
RUN backstop test
RUN backstop approve 



#                   _       
#                  | |      
#  _ __   ___  _ __| |_ ___ 
# | '_ \ / _ \| '__| __/ __|
# | |_) | (_) | |  | |_\__ \
# | .__/ \___/|_|   \__|___/
# | |                       
# |_|                       
# 
EXPOSE 24444
EXPOSE 25900
EXPOSE 26080

