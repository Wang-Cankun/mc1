import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

// Run test watch
// npm run test:watch -- app.service

describe('AppController', () => {
  let appController: AppController
  let service: AppService
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile()

    service = app.get<AppService>(AppService)
    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Microservice example"', () => {
      expect(appController.getHello()).toBe('Microservice example')
    })
  })

  describe('findOne', () => {
    describe('Mock inside app controller', () => {
      it('should return "Found ID: 1"', () => {
        expect(appController.findOne('1')).toBe('Found ID: 1')
      })
    })

    describe('Mock some variables', () => {
      it('should return "Found ID: 1"', () => {
        const id = '1'
        const result = service.findOne(id)
        expect(result).toBe('Found ID: 1')
      })
    })

    describe('Error in Try-Catch', () => {
      it('should throw NotFoundException', () => {
        try {
          appController.findOne('2')
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException)
          expect(e.message).toEqual('Not Found')
        }
      })
    })
    describe('otherwise', () => {
      it('should throw NotFoundException', async () => {
        undefined
      })
    })
  })

  describe('postOne', () => {
    describe('Mock post function', () => {
      it('should return ID and a timestamp', () => {
        expect(appController.postOne({ id: '123' })).toEqual(
          jasmine.objectContaining({
            id: '123',
            timestamp: expect.any(Date)
          })
        )
      })
    })
  })
})
