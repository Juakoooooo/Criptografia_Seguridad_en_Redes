#Código generado por ChatGPT

TAM_MAX_CLAVE = 26

def cifrarCesar(mensaje, clave):
    traduccion = ''
    for simbolo in mensaje:
        if simbolo.isalpha():
            num = ord(simbolo)
            num += clave
            if simbolo.isupper():
                if num > ord('Z'):
                    num -= 26
                elif num < ord('A'):
                    num += 26
            elif simbolo.islower():
                if num > ord('z'):
                    num -= 26
                elif num < ord('a'):
                    num += 26
            traduccion += chr(num)
        else:
            traduccion += simbolo
    return traduccion

entrada = input("")
mensaje, clave = entrada.split('"')[1], entrada.split()[-1]  # Separar la frase y la clave
clave = int(clave)  # Convertir la clave a entero

print(cifrarCesar(mensaje, clave))

