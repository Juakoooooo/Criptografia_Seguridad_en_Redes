#Código generado por ChatGPT

from scapy.all import *
import struct
import time

def enviar_paquetes_ping(frase_cifrada, destino, seq):
    id_paquete = 1  # Inicializar el ID del paquete
    for caracter in frase_cifrada:
        # Obtener el timestamp actual
        timestamp = time.time()

        # Construir el payload con el caracter cifrado y los timestamp en ambos formatos
        
        payload_little_endian = bytes([ord(caracter)]) + struct.pack('<' + 'B' * 40, *range(0x10, 0x38))
        payload_combinado = payload_little_endian  # Combinar los payloads

        # Construir el paquete ICMP con los requisitos especificados
        paquete = IP(dst=destino, id=id_paquete, flags=0) / ICMP(id=100, seq=seq) / payload_combinado

        # Calcular el checksum ICMP
        paquete[ICMP].chksum = 0  # Reiniciar el checksum para que Scapy lo recalcule
        paquete = paquete.__class__(bytes(paquete))  # Convertir a paquete ICMP
        paquete[ICMP].chksum = checksum(bytes(paquete))

        # Enviar el paquete
        send(paquete, verbose=False)
        print(f"1 paquete enviado - Timestamp: {timestamp}")

        seq += 1


frase_cifrada = input()

# Dirección IP de loopback
destino = "127.0.0.1"

# Número de secuencia inicial
seq = 1

# Extraer la frase cifrada entre comillas
frase_cifrada = frase_cifrada.split('"')[1]

enviar_paquetes_ping(frase_cifrada, destino, seq)
