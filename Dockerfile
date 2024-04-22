FROM quay.io/suhailtechinfo/suhail-v2
RUN git clone https://github.com/Astropeda/Asta-Md /root/Astro
WORKDIR /root/Astro
RUN npm install
EXPOSE 8000
CMD ["npm","start" ] 