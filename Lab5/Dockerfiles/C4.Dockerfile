# Usa la imagen base de Ubuntu 22.10
FROM ubuntu:22.10

# Copia el archivo sources.list modificado
COPY sources.list /etc/apt/sources.list

# Configura el entorno para que no interactúe con el usuario durante la instalación
ENV DEBIAN_FRONTEND=noninteractive

# Actualiza el sistema e instala el cliente y servidor OpenSSH
RUN apt-get update && apt-get install -y \
    openssh-client \
    openssh-server

# Crea el usuario 'prueba' con la contraseña 'prueba'
RUN useradd -m -s /bin/bash prueba && echo 'prueba:prueba' | chpasswd

# Permitir la autenticación de contraseña en SSH
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config \
    && sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Exponer el puerto 22 para conexiones SSH
EXPOSE 22

# Configura el contenedor para comportarse como un servidor SSH
CMD ["/usr/sbin/sshd", "-D"]
