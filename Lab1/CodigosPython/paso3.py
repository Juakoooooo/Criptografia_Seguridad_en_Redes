#Código generado por ChatGPT

import sys
from scapy.all import *

def cesar_decode(texto_cifrado, clave):
    texto_decodificado = ""
    for char in texto_cifrado:
        if char.isalpha():
            offset = ord('a') if char.islower() else ord('A')
            dec = (ord(char) - offset - clave) % 26 + offset
            texto_decodificado += chr(dec)
        else:
            texto_decodificado += char
    return texto_decodificado

def puntuacion_espanol(frase):
    frecuencias_espanol = {
        'a': 0.1253, 'b': 0.0142, 'c': 0.0468, 'd': 0.0586, 'e': 0.1368, 'f': 0.0069,
        'g': 0.0101, 'h': 0.0070, 'i': 0.0625, 'j': 0.0044, 'k': 0.0002, 'l': 0.0497,
        'm': 0.0315, 'n': 0.0671, 'ñ': 0.0034, 'o': 0.0868, 'p': 0.0251, 'q': 0.0088,
        'r': 0.0687, 's': 0.0798, 't': 0.0463, 'u': 0.0393, 'v': 0.0090, 'w': 0.0001,
        'x': 0.0022, 'y': 0.0090, 'z': 0.0052
    }
    puntuacion = 0
    for letra in frase:
        if letra in frecuencias_espanol:
            puntuacion += frecuencias_espanol[letra]
    return puntuacion

def main():
    if len(sys.argv) != 2:
        print("Uso: python3 readv2.py archivo.pcapng")
        return
    
    archivo_pcapng = sys.argv[1]

    # Leer el archivo pcapng
    paquetes = rdpcap(archivo_pcapng)

    # Lista para almacenar las frases decodificadas con cada clave
    frases_por_clave = [''] * 26

    # Recorrer los paquetes e imprimir los datos si son de tipo Raw
    for paquete in paquetes:
        if Raw in paquete:
            datos = paquete[Raw].load.decode('utf-8')
            datos_sin_secuencia = datos.replace("1234567", "")
            
            # Acumular las letras descifradas en una cadena para cada clave
            for clave in range(26):
                frase_decodificada = cesar_decode(datos_sin_secuencia, clave)
                frases_por_clave[clave] += frase_decodificada

    # Determinar la frase correcta en base al idioma español
    mejor_puntuacion = 0
    frase_correcta = ''
    for frase in frases_por_clave:
        puntuacion = puntuacion_espanol(frase)
        if puntuacion > mejor_puntuacion:
            mejor_puntuacion = puntuacion
            frase_correcta = frase

    # Imprimir las frases completas para cada clave
    for clave, frase in enumerate(frases_por_clave):
        if frase == frase_correcta:
            print("\033[92m" + frase + "\033[0m")
        else:
            print(frase)

if __name__ == "__main__":
    main()
