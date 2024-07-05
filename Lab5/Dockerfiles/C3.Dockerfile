# Usa la imagen base de Ubuntu 20.10
FROM ubuntu:20.10

# Copia el archivo sources.list modificado
COPY sources.list /etc/apt/sources.list

# Configura el entorno para que no interactúe con el usuario durante la instalación
ENV DEBIAN_FRONTEND=noninteractive

# Actualiza el sistema e instala el cliente OpenSSH
RUN apt-get update && apt-get install -y \
    openssh-client

# Exponer el puerto 22 para conexiones SSH
EXPOSE 22

# Comando por defecto
CMD ["bash"]
