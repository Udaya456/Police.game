import pygame
import random

# Initialize Pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Sky Chase: Police vs. Thief")

# Colors
WHITE = (255, 255, 255)
BLUE = (0, 0, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLACK = (0, 0, 0)

# Fonts
font = pygame.font.Font(None, 36)

# Player settings
police = pygame.Rect(100, 100, 50, 50)  # Police starting position
thief = pygame.Rect(600, 400, 50, 50)   # Thief starting position
police_speed = 3
thief_speed = 4

# Airports
NUM_AIRPORTS = 10
airports = [pygame.Rect(random.randint(50, WIDTH - 50), random.randint(50, HEIGHT - 50), 30, 30) for _ in range(NUM_AIRPORTS)]

# Game variables
fuel = 100
coins = 0
running = True
clock = pygame.time.Clock()

# Main game loop
while running:
    screen.fill(WHITE)

    # Draw airports
    for airport in airports:
        pygame.draw.ellipse(screen, GREEN, airport)

    # Draw players
    pygame.draw.rect(screen, BLUE, police)  # Police plane
    pygame.draw.rect(screen, RED, thief)   # Thief plane

    # Display coins and fuel
    coin_text = font.render(f"Coins: {coins}", True, BLACK)
    fuel_text = font.render(f"Fuel: {fuel}", True, BLACK)
    screen.blit(coin_text, (10, 10))
    screen.blit(fuel_text, (10, 40))

    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Key controls for thief
    keys = pygame.key.get_pressed()
    if keys[pygame.K_UP]:
        thief.y -= thief_speed
    if keys[pygame.K_DOWN]:
        thief.y += thief_speed
    if keys[pygame.K_LEFT]:
        thief.x -= thief_speed
    if keys[pygame.K_RIGHT]:
        thief.x += thief_speed

    # Simple AI for police
    if police.x < thief.x:
        police.x += police_speed
    if police.x > thief.x:
        police.x -= police_speed
    if police.y < thief.y:
        police.y += police_speed
    if police.y > thief.y:
        police.y -= police_speed

    # Check for airport collision (Thief collects coins)
    for airport in airports:
        if thief.colliderect(airport):
            coins += 1
            airports.remove(airport)  # Remove the visited airport
            break

    # Check for collision between police and thief
    if police.colliderect(thief):
        running = False
        print("Game Over: Police caught the Thief!")

    # Update fuel
    fuel -= 0.1
    if fuel <= 0:
        running = False
        print("Game Over: Thief ran out of fuel!")

    # Update display
    pygame.display.flip()
    clock.tick(30)

pygame.quit()


def init():
    return None